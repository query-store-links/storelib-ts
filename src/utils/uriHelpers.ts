import { DCatEndpoint, getDCatBaseUrl } from '../types/endpoint';
import { Locale } from '../services/locale';
import { IdentifierType } from '../types/datatypes';

export class UriHelpers {
    /**
     * 根据 IdentifierType 构造 DCAT 查询 URI
     * @param endpoint 目标端点
     * @param id 标识符的值
     * @param idType 标识符的类型 (来自你的 IdentifierType 枚举)
     * @param locale 区域信息
     */
    public static CreateAlternateDCatUri(
        endpoint: DCatEndpoint,
        id: string,
        idType: IdentifierType,
        locale: Locale
    ): string {
        const baseUrl = getDCatBaseUrl(endpoint);
        // 确保 baseUrl 以斜杠结尾，因为 C# 的 EnumToUri 通常返回类似 ".../v7.0/products/"
        const base = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;

        switch (idType) {
            case IdentifierType.ProductID:
                // 标准逻辑：直接拼接 ID
                // 结果示例：.../products/9WZDNCRFJBMP?market=US...
                return `${base}${id}?${locale.DCatTrail}`;

            case IdentifierType.ContentID:
            case IdentifierType.LegacyWindowsPhoneProductID:
            case IdentifierType.LegacyWindowsStoreProductID:
            case IdentifierType.LegacyXboxProductID:
            case IdentifierType.PackageFamilyName:
            case IdentifierType.XboxTitleID:
                // 标准逻辑：使用 lookup 路径，并且参数格式为 alternateId=TYPE&Value=ID
                // 还要加上 &fieldsTemplate=Details
                // 结果示例：.../products/lookup?alternateId=PackageFamilyName&Value=xxx&market=US...&fieldsTemplate=Details
                return `${base}lookup?alternateId=${idType}&Value=${id}&${locale.DCatTrail}&fieldsTemplate=Details`;

            default:
                // 按照 C# 逻辑，未知类型抛出异常
                throw new Error(
                    "CreateAlternateDCatUri: Unknown IdentifierType was passed, an update is likely required, please report this issue."
                );
        }
    }

    /**
     * 构造基础的产品详情 URI
     */
    public static CreateDCatUri(endpoint: DCatEndpoint, id: string, locale: Locale): string {
        return `${getDCatBaseUrl(endpoint)}${id}?${locale.DCatTrail}`;
    }
}