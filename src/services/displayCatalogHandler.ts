import { MSHttpClient } from './MSHttpClient';
import { FE3Handler } from './fe3handler';
import { Locale, Market, Lang } from './locale';
import { getDCatBaseUrl, DCatEndpoint } from '../types/endpoint';
import { DisplayCatalogModel } from '../types/dcat';
import { DCatSearch } from '../types/dcatSearch';
import {
    DisplayCatalogResult,
    IdentifierType,
    DeviceFamily
} from '../types/datatypes';
import { PackageInstance } from '../types/fe3';
import { UriHelpers } from '../utils/uriHelpers';
import { TypeHelpers } from '../utils/typeHelpers';

export class DisplayCatalogHandler {
    private readonly _httpClient: MSHttpClient;

    public ProductListing: DisplayCatalogModel | null = null;
    public Error: Error | null = null;
    public ConstructedUri: string | null = null;
    public SelectedEndpoint: DCatEndpoint;
    public Result: DisplayCatalogResult = DisplayCatalogResult.NotFound;
    public DeviceFamily: DeviceFamily = DeviceFamily.Universal;
    public SearchResult: DCatSearch | null = null;
    public ID: string = "";
    public SelectedLocale: Locale;
    public IsFound: boolean = false;

    constructor(selectedEndpoint: DCatEndpoint, locale: Locale) {
        // MSHttpClient 内部会自动处理 MS-CV 追踪头和 User-Agent
        this._httpClient = new MSHttpClient();
        this.SelectedEndpoint = selectedEndpoint;
        this.SelectedLocale = locale;
    }

    /**
     * 默认生产环境配置
     */
    public static ProductionConfig(): DisplayCatalogHandler {
        // 假设 Market 和 Lang 枚举已在 locale.ts 中定义
        return new DisplayCatalogHandler(
            DCatEndpoint.Production,
            new Locale(Market.US, Lang.en, true)
        );
    }

    /**
     * 获取产品的下载包列表 (整合 FE3Handler)
     */
    public async GetPackagesForProductAsync(msaToken: string | null = null): Promise<PackageInstance[]> {
        // 兼容不同的返回结构
        const product = this.ProductListing?.Products?.[0] || this.ProductListing?.Product;

        if (!product) {
            throw new Error("Cannot get packages: Product data is null.");
        }

        const skuProperties = product.DisplaySkuAvailabilities?.[0]?.Sku?.Properties;

        if (!skuProperties?.FulfillmentData?.WuCategoryId) {
            throw new Error("Cannot get packages: FulfillmentData (WuCategoryId) is missing for this product.");
        }

        // 1. 调用 FE3 协议同步更新信息
        const xml = await FE3Handler.SyncUpdatesAsync(
            skuProperties.FulfillmentData.WuCategoryId,
            msaToken
        );

        // 2. 解析 XML 获取各种 ID
        const { updateIDs, revisionIDs } = FE3Handler.ProcessUpdateIDs(xml);

        // 3. 获取包实例
        const packageInstances = await FE3Handler.GetPackageInstancesAsync(xml);

        // 4. 获取文件真实下载地址
        const files = await FE3Handler.GetFileUrlsAsync(updateIDs, revisionIDs, msaToken);

        // 5. 建立包与下载地址的映射关系
        packageInstances.forEach((pkg, index) => {
            if (files[index]) {
                pkg.PackageUri = files[index];
                pkg.UpdateId = updateIDs[index];
            }
        });

        return packageInstances;
    }

    /**
     * 查询产品详情 (QueryDCATAsync)
     */
    public async QueryDCATAsync(
        id: string,
        idType: IdentifierType = IdentifierType.ProductID,
        authenticationToken: string | null = null
    ): Promise<void> {
        this.ID = id;
        this.ConstructedUri = UriHelpers.CreateAlternateDCatUri(
            this.SelectedEndpoint,
            id,
            idType,
            this.SelectedLocale
        );

        const headers: Record<string, string> = {};
        if (authenticationToken) {
            headers["Authentication"] = authenticationToken;
        }

        try {
            const response = await this._httpClient.getRaw<DisplayCatalogModel>(this.ConstructedUri, { headers });

            if (response.status === 200) {
                this.Result = DisplayCatalogResult.Found;
                this.IsFound = true;
                const listing = response.data as DisplayCatalogModel;
                this.ProductListing = listing;
                // 如果返回的是 Products 数组而没有 Product 属性，则标准化设置 Product 为首个元素
                if (!listing.Product && listing.Products && listing.Products.length > 0) {
                    listing.Product = listing.Products[0];
                }
                // 记录获取到的产品标题
                const product = listing.Product || listing.Products?.[0];
            } else {
                this.Result = DisplayCatalogResult.NotFound;
            }
        } catch (error: any) {
            this.Result = DisplayCatalogResult.TimedOut;
            throw error;
        }
    }

    /**
     * 搜索产品 (SearchDCATAsync)
     */
    public async SearchDCATAsync(query: string, deviceFamily: DeviceFamily): Promise<DCatSearch> {
        let platformDependency = "Windows.Universal";

        // 平台依赖项映射逻辑
        switch (deviceFamily) {
            case DeviceFamily.Desktop: platformDependency = "Windows.Desktop"; break;
            case DeviceFamily.Xbox: platformDependency = "Windows.Xbox"; break;
            case DeviceFamily.Mobile: platformDependency = "Windows.Mobile"; break;
            case DeviceFamily.HoloLens: platformDependency = "Windows.Holographic"; break;
            case DeviceFamily.IotCore: platformDependency = "Windows.Iot"; break;
            case DeviceFamily.ServerCore: platformDependency = "Windows.Server"; break;
            case DeviceFamily.Andromeda: platformDependency = "Windows.8828080"; break;
            case DeviceFamily.WCOS: platformDependency = "Windows.Core"; break;
        }

        // 使用与 C# 等效的 EnumToSearchUri 来构建查询 URL，并使用前面计算的 platformDependency
        const url = `${TypeHelpers.EnumToSearchUri(this.SelectedEndpoint)}${encodeURIComponent(query)}&productFamilyNames=apps,games&platformDependencyName=${platformDependency}`;

        try {
            const response = await this._httpClient.get<DCatSearch>(url);
            this.Result = DisplayCatalogResult.Found;
            return response;
        } catch (error) {
            throw new Error(`Failed to search DisplayCatalog: ${deviceFamily} - ${error}`);
        }
    }
}