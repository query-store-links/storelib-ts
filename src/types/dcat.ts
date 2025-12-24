export interface DisplayCatalogModel {
  Product: Product;
  BigIds: string[];
  HasMorePages: boolean;
  Products: Product[];
  TotalResultCount: number;
}

export interface Product {
  LastModifiedDate: string;
  LocalizedProperties: ProductLocalizedProperty[];
  MarketProperties: ProductMarketProperty[];
  ProductASchema: string;
  ProductBSchema: string;
  Properties: ProductProperties;
  AlternateIds: AlternateId[];
  DomainDataVersion: any;
  IngestionSource: string;
  IsMicrosoftProduct: boolean;
  PreferredSkuId: string;
  ProductType: string;
  ValidationData: ValidationData;
  SandboxId: string;
  IsSandboxedProduct: boolean;
  MerchandizingTags: any[];
  PartD: string;
  ProductFamily: string;
  SchemaVersion: string;
  ProductKind: string;
  DisplaySkuAvailabilities: DisplaySkuAvailability[];
}

export interface ValidationData {
  PassedValidation: boolean;
  RevisionId: string;
  ValidationResultUri: string;
}

export interface ProductProperties {
  Attributes: any[];
  CanInstallToSDCard: boolean;
  Category: string;
  SubCategory: string;
  Categories: any;
  Extensions: any;
  IsAccessible: boolean;
  IsLineOfBusinessApp: boolean;
  IsPublishedToLegacyWindowsPhoneStore: boolean;
  IsPublishedToLegacyWindowsStore: boolean;
  IsSettingsApp: boolean;
  PackageFamilyName: string;
  PackageIdentityName: string;
  PublisherCertificateName: string;
  PublisherId: string;
  XboxLiveTier: any;
  XboxXPA: any;
  OwnershipType: any;
  PdpBackgroundColor: string;
  HasAddOns: boolean | null;
  RevisionId: string;
  ProductGroupId: string;
  ProductGroupName: string;
}

export interface ProductMarketProperty {
  OriginalReleaseDate: string;
  OriginalReleaseDateFriendlyName: string;
  MinimumUserAge: number;
  ContentRatings: ContentRating[];
  RelatedProducts: any[];
  UsageData: UsageDatum[];
  BundleConfig: any;
  Markets: string[];
}

export interface UsageDatum {
  AverageRating: number;
  AggregateTimeSpan: string;
  RatingCount: number;
  PurchaseCount: number;
  TrialCount: number | null;
  RentalCount: number;
  PlayCount: number;
}

export interface ContentRating {
  RatingSystem: string;
  RatingId: string;
  RatingDescriptors: string[];
  RatingDisclaimers: any[];
  InteractiveElements: string[];
}

export interface ProductLocalizedProperty {
  DeveloperName: string;
  DisplayPlatformProperties: any;
  PublisherName: string;
  PublisherWebsiteUri: string;
  SupportUri: string;
  EligibilityProperties: any;
  Franchises: any[];
  Images: Image[];
  Videos: any[];
  ProductDescription: string;
  ProductTitle: string;
  ShortTitle: string;
  SortTitle: string;
  ShortDescription: string;
  SearchTitles: SearchTitle[];
  VoiceTitle: string;
  RenderGroupDetails: any;
  ProductDisplayRanks: any[];
  Language: string;
  Markets: string[];
}

export interface SearchTitle {
  SearchTitleString: string;
  SearchTitleType: string;
}

export interface Image {
  BackgroundColor: string;
  Caption: string;
  FileSizeInBytes: number;
  ForegroundColor: string;
  Height: number;
  ImagePositionInfo: string;
  ImagePurpose: string;
  UnscaledImageSHA256Hash: string;
  Uri: string;
  Width: number;
}

export interface DisplaySkuAvailability {
  Sku: Sku;
  Availabilities: Availability[];
}

export interface Sku {
  LastModifiedDate: string;
  LocalizedProperties: SkuLocalizedProperty[];
  MarketProperties: SkuMarketProperty[];
  Properties: SkuProperties;
  SkuASchema: string;
  SkuBSchema: string;
  SkuId: string;
  SkuType: string;
  RecurrencePolicy: any;
  SubscriptionPolicyId: any;
}

export interface SkuProperties {
  EarlyAdopterEnrollmentUrl: any;
  FulfillmentData: FulfillmentData;
  FulfillmentType: string;
  HasThirdPartyIAPs: boolean;
  LastUpdateDate: string;
  HardwareProperties: HardwareProperties;
  HardwareRequirements: any[];
  HardwareWarningList: any[];
  InstallationTerms: string;
  Packages: Package[];
  VersionString: string;
  VisibleToB2BServiceIds: any[];
  XboxXPA: boolean;
  BundledSkus: any[];
  IsRepurchasable: boolean | null;
  SkuDisplayRank: number;
  DisplayPhysicalStoreInventory: any;
  AdditionalIdentifiers: any[];
  IsTrial: boolean;
  IsPreOrder: boolean;
  IsBundle: boolean;
}

export interface Package {
  Applications: Application[];
  Architectures: string[];
  Capabilities: string[];
  DeviceCapabilities: any[];
  ExperienceIds: any[];
  FrameworkDependencies: any[];
  HardwareDependencies: any[];
  HardwareRequirements: any[];
  Hash: string;
  HashAlgorithm: string;
  IsStreamingApp: boolean;
  Languages: string[];
  MaxDownloadSizeInBytes: number;
  MaxInstallSizeInBytes: string;
  PackageFormat: string;
  PackageFamilyName: string;
  MainPackageFamilyNameForDlc: any;
  PackageFullName: string;
  PackageId: string;
  ContentId: string;
  KeyId: string;
  PackageRank: number;
  PackageUri: string;
  PlatformDependencies: PlatformDependency[];
  PlatformDependencyXmlBlob: string;
  ResourceId: string;
  Version: string;
  PackageDownloadUris: PackageDownloadUris[];
  DriverDependencies: any[];
  FulfillmentData: FulfillmentData;
}

export interface PackageDownloadUris {
  Uri: string;
  Rank: number;
}

export interface PlatformDependency {
  MaxTested: number;
  MinVersion: number;
  PlatformName: string;
}

export interface Application {
  ApplicationId: string;
  DeclarationOrder: number;
  Extensions: string[];
}

export interface HardwareProperties {
  MinimumHardware: any[];
  RecommendedHardware: string[];
  MinimumProcessor: string;
  RecommendedProcessor: string;
  MinimumGraphics: string;
  RecommendedGraphics: string;
}

export interface FulfillmentData {
  WuBundleId: string;
  WuCategoryId: string;
  PackageFamilyName: string;
  SkuId: string;
  Content: any;
}

export interface SkuMarketProperty {
  FirstAvailableDate: string;
  SupportedLanguages: string[];
  PackageIds: any;
  Markets: string[];
}

export interface SkuLocalizedProperty {
  Contributors: any[];
  Features: any[];
  MinimumNotes: string;
  RecommendedNotes: string;
  ReleaseNotes: string;
  DisplayPlatformProperties: any;
  SkuDescription: string;
  SkuTitle: string;
  SkuButtonTitle: string;
  DeliveryDateOverlay: any;
  SkuDisplayRank: any[];
  TextResources: any;
  Images: any[];
  LegalText: LegalText;
  Language: string;
  Markets: string[];
}

export interface LegalText {
  AdditionalLicenseTerms: string;
  Copyright: string;
  CopyrightUri: string;
  PrivacyPolicy: string;
  PrivacyPolicyUri: string;
  Tou: string;
  TouUri: string;
}

export interface Availability {
  Actions: string[];
  AvailabilityASchema: string;
  AvailabilityBSchema: string;
  AvailabilityId: string;
  Conditions: Conditions;
  LastModifiedDate: string;
  Markets: string[];
  OrderManagementData: OrderManagementData;
  Properties: AvailabilityProperties;
  SkuId: string;
  DisplayRank: number;
  RemediationRequired: boolean;
}

export interface AvailabilityProperties {
  OriginalReleaseDate: string | null;
}

export interface OrderManagementData {
  GrantedEntitlementKeys: any[];
  PIFilter: PiFilter;
  Price: Price;
}

export interface Price {
  CurrencyCode: string;
  IsPIRequired: boolean;
  ListPrice: number;
  MSRP: number;
  TaxType: string;
  WholesaleCurrencyCode: string;
}

export interface PiFilter {
  ExclusionProperties: any[];
  InclusionProperties: any[];
}

export interface Conditions {
  ClientConditions: ClientConditions;
  EndDate: string;
  ResourceSetIds: string[];
  StartDate: string;
}

export interface ClientConditions {
  AllowedPlatforms: AllowedPlatform[];
}

export interface AllowedPlatform {
  MaxVersion: number;
  MinVersion: number;
  PlatformName: string;
}

export interface AlternateId {
  IdType: string;
  Value: string;
}
