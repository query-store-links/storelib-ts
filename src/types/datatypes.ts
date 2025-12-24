export enum PackageType {
  UAP = "UAP",
  XAP = "XAP",
  AppX = "AppX",
  Unknown = "Unknown",
}

export enum IdentifierType {
  ProductID = "ProductID",
  XboxTitleID = "XboxTitleID",
  PackageFamilyName = "PackageFamilyName",
  ContentID = "ContentID",
  LegacyWindowsPhoneProductID = "LegacyWindowsPhoneProductID",
  LegacyWindowsStoreProductID = "LegacyWindowsStoreProductID",
  LegacyXboxProductID = "LegacyXboxProductID",
}

export enum ImagePurpose {
  Logo = "Logo",
  Tile = "Tile",
  Screenshot = "Screenshot",
  BoxArt = "BoxArt",
  BrandedKeyArt = "BrandedKeyArt",
  Poster = "Poster",
  FeaturePromotionalSquareArt = "FeaturePromotionalSquareArt",
  ImageGallery = "ImageGallery",
  SuperHeroArt = "SuperHeroArt",
  TitledHeroArt = "TitledHeroArt",
}

export enum ProductKind {
  Game = "Game",
  Application = "Application",
  Book = "Book",
  Movie = "Movie",
  Physical = "Physical",
  Software = "Software",
}

export enum DeviceFamily {
  Desktop = "Desktop",
  Mobile = "Mobile",
  Xbox = "Xbox",
  ServerCore = "ServerCore",
  IotCore = "IotCore",
  HoloLens = "HoloLens",
  Andromeda = "Andromeda",
  Universal = "Universal",
  WCOS = "WCOS",
}

export enum DisplayCatalogResult {
  NotFound = "NotFound",
  Restricted = "Restricted",
  TimedOut = "TimedOut",
  Error = "Error",
  Found = "Found",
}
