import { UriHelpers } from '../src/utils/uriHelpers';
import { DCatEndpoint } from '../src/types/endpoint';
import { Locale, Market, Lang } from '../src/services/locale';
import { IdentifierType } from '../src/types/datatypes';

describe('UriHelpers Unit Tests', () => {
  const locale = new Locale(Market.US, Lang.en, true);

  test('Should create correct ProductID URI', () => {
    const uri = UriHelpers.CreateAlternateDCatUri(
      DCatEndpoint.Production,
      '9WZDNCRFJBMP',
      IdentifierType.ProductID,
      locale
    );
    expect(uri).toContain('/products/9WZDNCRFJBMP?');
    expect(uri).toContain('market=US');
  });

  test('Should create correct PFN URI (AlternateId)', () => {
    const pfn = 'Microsoft.WindowsStore_8wekyb3d8bbwe';
    const uri = UriHelpers.CreateAlternateDCatUri(
      DCatEndpoint.Production,
      pfn,
      IdentifierType.PackageFamilyName,
      locale
    );
    // 验证是否正确去掉了 products/ 后面的斜杠并加上了参数
    expect(uri).toContain('/products/lookup?alternateId=PackageFamilyName&Value=');
  expect(uri).toContain('&fieldsTemplate=Details');
  });
});