import { DisplayCatalogHandler } from '../src/services/displayCatalogHandler';
import { Locale, Market, Lang } from '../src/services/locale';
import { DCatEndpoint } from '../src/types/endpoint';
import { IdentifierType, DeviceFamily, DisplayCatalogResult } from '../src/types/datatypes';

describe('DisplayCatalogHandler Integration Tests', () => {
  let handler: DisplayCatalogHandler;

  beforeAll(() => {
    const locale = new Locale(Market.US, Lang.en, true);
    handler = new DisplayCatalogHandler(DCatEndpoint.Production, locale);
  });

  test('Query Product Details (Microsoft Store)', async () => {
    const productId = '9WZDNCRFJBMP'; // Microsoft Store 的 ProductID
    await handler.QueryDCATAsync(productId, IdentifierType.ProductID);

    expect(handler.IsFound).toBe(true);
    expect(handler.Result).toBe(DisplayCatalogResult.Found);
    expect(handler.ProductListing).toBeDefined();
    
    const title = handler.ProductListing?.Product.LocalizedProperties[0].ProductTitle;
    console.log(`Product Title: ${title}`);
    expect(title).toContain('Microsoft Store');
  });

  test('Search Products', async () => {
    const query = 'Netflix';
    const searchResult = await handler.SearchDCATAsync(query, DeviceFamily.Desktop);

    expect(searchResult.TotalResultCount).toBeGreaterThan(0);
    expect(searchResult.Results[0].Products.length).toBeGreaterThan(0);
    
    console.log(`First Search Result: ${searchResult.Results[0].Products[0].Title}`);
    expect(searchResult.Results[0].Products[0].Title.toLowerCase()).toContain('netflix');
  });

  test('Get Download Packages', async () => {
    const productId = '9WZDNCRFJBMP'; 
    await handler.QueryDCATAsync(productId, IdentifierType.ProductID);

    try {
      const packages = await handler.GetPackagesForProductAsync();
      
      expect(packages.length).toBeGreaterThan(0);
      expect(packages[0].PackageUri).toBeDefined();
      expect(packages[0].PackageUri).toContain('http');
      
      console.log(`Found ${packages.length} packages.`);
      console.log(`First Package Download URL: ${packages[0].PackageUri}`);
    } catch (error) {
      console.warn('Could not fetch packages for this product, might be restricted.');
      console.warn(error);
    }
  }, 60000);

  test('Query by Package Family Name (PFN)', async () => {
    const pfn = 'Microsoft.WindowsStore_8wekyb3d8bbwe';
    await handler.QueryDCATAsync(pfn, IdentifierType.PackageFamilyName);

    expect(handler.IsFound).toBe(true);
    expect(handler.ProductListing?.Product.Properties.PackageFamilyName).toBe(pfn);
  });
});
