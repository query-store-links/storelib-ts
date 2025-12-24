import { ProductKind } from './datatypes';

export interface Addon {
  ProductID: string;
  ProductType: ProductKind;
  DisplayName: string;
}
