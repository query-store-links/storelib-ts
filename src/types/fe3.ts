export interface PackageInstance {
  PackageMoniker: string;
  PackageUri: string;
  PackageType: any;
  ApplicabilityBlob: ApplicabilityBlob;
  UpdateId: string;
}

export interface ContentTargetPlatform {
  "platform.maxVersionTested": number;
  "platform.minVersion": number;
  "platform.target": number;
}

export interface Policy {
  "category.first": string;
  "category.second": string;
  "category.third": string;
  "optOut.backupRestore": boolean;
  "optOut.removeableMedia": boolean;
}

export interface ThirdPartyAppRating {
  level: number;
  systemId: number;
}

export interface Policy2 {
  ageRating: number;
  "optOut.DVR": boolean;
  thirdPartyAppRatings: ThirdPartyAppRating[];
}

export interface ApplicabilityBlob {
  "blob.version": number;
  "content.isMain": boolean;
  "content.packageId": string;
  "content.productId": string;
  "content.targetPlatforms": ContentTargetPlatform[];
  "content.type": number;
  policy: Policy;
  policy2: Policy2;
}
