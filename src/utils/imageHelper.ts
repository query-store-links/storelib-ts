import * as fs from 'fs/promises';
import * as path from 'path';
import * as crypto from 'crypto';
import axios from 'axios';
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
    CachePath: string,
    OverwriteCache: boolean
  ): Promise<Buffer> {
    const hashedUri = crypto.createHash('md5').update(ImageUri).digest('hex');
    const fullPath = path.join(CachePath, hashedUri);

    try {
      const exists = await fs.access(fullPath).then(() => true).catch(() => false);

      if (OverwriteCache || !exists) {
        await fs.mkdir(CachePath, { recursive: true });

        const response = await axios.get(ImageUri, { responseType: 'arraybuffer' });
        const imageBuffer = Buffer.from(response.data);

        await fs.writeFile(fullPath, imageBuffer);
        return imageBuffer;
      } else {
        return await fs.readFile(fullPath);
      }
    } catch (error) {
      throw new Error(`Failed to cache image: ${(error as Error).message}`);
    }
  }
}