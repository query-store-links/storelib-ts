export interface Product {
  Height: number;
  ImageType: string;
  Width: number;
  PlatformProperties: any[];
  Icon: string;
  ProductId: string;
  Type: string;
  Title: string;
  BackgroundColor?: string;
}

export interface Result {
  ProductFamilyName: string;
  Products: Product[];
}

export interface DCatSearch {
  Results: Result[];
  TotalResultCount: number;
}

export const DCatSearchConvert = {
  fromJson(json: string): DCatSearch {
    return JSON.parse(json);
  },

  toJson(value: DCatSearch): string {
    return JSON.stringify(value, null, 2);
  }
};