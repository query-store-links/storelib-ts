// Uses Fetch API and Cache; compatible with Cloudflare Workers
import { ImagePurpose } from '../types/datatypes';
import { DisplayCatalogModel } from '../types/dcat';

export class ImageHelpers {
  public static GetImageUri(
    WantedImageType: ImagePurpose,
    displayCatalogModel: DisplayCatalogModel
  ): string | null {
    const images = displayCatalogModel.Product?.LocalizedProperties?.[0]?.Images;

    if (!images) return null;

    for (const image of images) {
      if (image.ImagePurpose === WantedImageType) {
        let uri = image.Uri;

        if (uri.startsWith('//')) {
          return `http:${uri}`;
        }
        return uri;
      }
    }

    return null;
  }

  /**
   * 图像缓存功能。
   * 将 URI 哈希后作为文件名。如果本地存在则返回缓存，否则从网络获取并存储。
   * * @param ImageUri 图像远程地址
   * @param CachePath 本地缓存目录路径
   * @param OverwriteCache 是否强制覆盖本地缓存
   * @returns 图像的 Buffer 数据
   */
  public static async CacheImageAsync(
    ImageUri: string,
    _CachePath: string,
    OverwriteCache: boolean
  ): Promise<Uint8Array> {
    try {
      const keyHash = await (async () => {
        const data = new TextEncoder().encode(ImageUri);
        const digest = await crypto.subtle.digest('SHA-256', data);
        return Array.from(new Uint8Array(digest)).map(b => b.toString(16).padStart(2, '0')).join('');
      })();

      const cache = (globalThis as any).caches;
      const request = new Request(ImageUri, { method: 'GET' });

      if (cache) {
        if (!OverwriteCache) {
          const cached = await cache.match(request);
          if (cached) {
            const buf = await cached.arrayBuffer();
            return new Uint8Array(buf);
          }
        }

        const response = await fetch(ImageUri);
        const buffer = await response.arrayBuffer();

        if (response.ok) {
          await cache.put(request, new Response(buffer, { headers: { 'Content-Type': response.headers.get('content-type') || 'application/octet-stream' } }));
        }

        return new Uint8Array(buffer);
      }

      // Fallback to fetch-only behavior
      const response = await fetch(ImageUri);
      const buf = await response.arrayBuffer();
      return new Uint8Array(buf);
    } catch (error) {
      throw new Error(`Failed to cache image: ${(error as Error).message}`);
    }
  }
}