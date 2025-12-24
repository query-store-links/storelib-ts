import { PackageType } from '../types/datatypes';
import { DCatEndpoint, getDCatBaseUrl, Endpoints } from '../types/endpoint';

export class TypeHelpers {
  /**
   * 将字符串转换为 PackageType 枚举。
   * 对应 C# 中的 Utilities.TypeHelpers.StringToPackageType
   * @param typeStr 从 XML 属性或 JSON 中获取的类型字符串
   */
  public static StringToPackageType(typeStr: string | null | undefined): PackageType {
    if (!typeStr) {
      return PackageType.Unknown;
    }
    switch (typeStr.trim()) {
      case "UAP":
        return PackageType.UAP;
      case "XAP":
        return PackageType.XAP;
      case "AppX":
      case "Appx":
        return PackageType.AppX;
      default:
        if (Object.values(PackageType).includes(typeStr as PackageType)) {
          return typeStr as PackageType;
        }
        return PackageType.Unknown;
    }
  }

  public static StringToEnum<T>(enumObj: any, value: string | null | undefined, defaultValue: T): T {
    if (!value) return defaultValue;
    if (Object.values(enumObj).includes(value)) {
      return value as unknown as T;
    }
    return defaultValue;
  }

  public static EnumToSearchUri(endpoint: DCatEndpoint): string {
    // 优先返回专门的搜索端点（包含 market & languages）
    switch (endpoint) {
      case DCatEndpoint.Production:
        return (Endpoints as any).DisplayCatalogSearch;
      case DCatEndpoint.Int:
        return (Endpoints as any).DisplayCatalogSearchInt;
      default: {
        // 退化为将 products/ 替换为 productFamilies/autosuggest 并加入默认 market/languages
        const baseUrl = getDCatBaseUrl(endpoint);
        return baseUrl.replace(/products\/$/, 'productFamilies/autosuggest?market=US&languages=en-US&query=');
      }
    }
  }
}