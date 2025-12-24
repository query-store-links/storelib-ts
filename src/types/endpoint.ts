export enum DCatEndpoint {
  Production = "Production",
  Int = "Int",
  Xbox = "Xbox",
  XboxInt = "XboxInt",
  Dev = "Dev",
  OneP = "OneP",
  OnePInt = "OnePInt",
}

export const Endpoints = {
  // FE3 Delivery 
  FE3Delivery: "https://fe3.delivery.mp.microsoft.com/ClientWebService/client.asmx",
  FE3DeliverySecured: "https://fe3.delivery.mp.microsoft.com/ClientWebService/client.asmx/secured",
  FE3CRDelivery: "https://fe3cr.delivery.mp.microsoft.com/ClientWebService/client.asmx",
  FE3CRDeliverySecured: "https://fe3cr.delivery.mp.microsoft.com/ClientWebService/client.asmx/secured",

  // FE6 Delivery
  FE6Delivery: "https://fe6.delivery.mp.microsoft.com/ClientWebService/client.asmx",
  FE6DeliverySecured: "https://fe6.delivery.mp.microsoft.com/ClientWebService/client.asmx/secured",
  FE6CRDelivery: "https://fe6cr.delivery.mp.microsoft.com/ClientWebService/client.asmx",
  FE6CRDeliverySecured: "https://fe6cr.delivery.mp.microsoft.com/ClientWebService/client.asmx/secured",

  // DCAT (Display Catalog)
  DCATProd: "https://displaycatalog.mp.microsoft.com/v7.0/products/",
  DCATInt: "https://displaycatalog-int.mp.microsoft.com/v7.0/products/",
  DCATXbox: "https://xbox-displaycatalog.mp.microsoft.com/v7.0/products/",
  DCATXboxInt: "https://xbox-displaycatalog-int.mp.microsoft.com/v7.0/products",
  DCATDev: "https://displaycatalog-dev.mp.microsoft.com/v7.0/products/",
  DCATOneP: "https://displaycatalog1p.mp.microsoft.com/v7.0/products/",
  DCATOnePInt: "https://displaycatalog1p-int.mp.microsoft.com/v7.0/products/",
  
  // Search
  DisplayCatalogSearch: "https://displaycatalog.mp.microsoft.com/v7.0/productFamilies/autosuggest?market=US&languages=en-US&query=",
  DisplayCatalogSearchInt: "https://displaycatalog-int.mp.microsoft.com/v7.0/productFamilies/autosuggest?market=US&languages=en-US&query=",

  // SCAT (Staging Catalog)
  SCATProd: "https://stagingcatalog.mp.microsoft.com/v7.0/products/",
  SCATInt: "https://stagingcatalog-int.mp.microsoft.com/v7.0/products/",
  SCATDev: "https://stagingcatalog-dev.mp.microsoft.com/v7.0/products/",
  SCATPublishingProd: "https://stagingcatalogpublishing.mp.microsoft.com/v7.0/products/",
  SCATPublishingInt: "https://stagingcatalogpublishing-int.mp.microsoft.com/v7.0/products/",
  SCATPublishingDev: "https://stagingcatalogpublishing-dev.mp.microsoft.com/v7.0/products/",

  // PPE & Other DCAT
  DCATOnePPPE: "https://displaycatalog1p-ppe.mp.microsoft.com/v7.0/products/",
  DCATPPE: "https://displaycatalog-ppe.mp.microsoft.com/v7.0/products/",
  DCATMD: "https://displaycatalog.md.mp.microsoft.com/v7.0/products/",
  DCATXboxPPE: "https://xbox-displaycatalog-PPE.mp.microsoft.com/v7.0/products/",

  // PCATS (Product Catalog Service)
  PCATSDevDPS: "https://productcatalogservice-dev.dps.mp.microsoft.com/v7.0/products/",
  PCATSDFDCE: "https://productcatalogservice-df.dce.mp.microsoft.com/v7.0/products/",
  PCATSDCE: "https://productcatalogservice.dce.mp.microsoft.com/v7.0/products/",
} as const;

/**
 * 方便根据枚举获取对应的 DCAT 基础地址
 */
export const getDCatBaseUrl = (endpoint: DCatEndpoint): string => {
  switch (endpoint) {
    case DCatEndpoint.Production: return Endpoints.DCATProd;
    case DCatEndpoint.Int: return Endpoints.DCATInt;
    case DCatEndpoint.Xbox: return Endpoints.DCATXbox;
    case DCatEndpoint.XboxInt: return Endpoints.DCATXboxInt;
    case DCatEndpoint.Dev: return Endpoints.DCATDev;
    case DCatEndpoint.OneP: return Endpoints.DCATOneP;
    case DCatEndpoint.OnePInt: return Endpoints.DCATOnePInt;
    default: return Endpoints.DCATProd;
  }
};
