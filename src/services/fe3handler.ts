import * as fs from 'fs';
import * as path from 'path';
import { DOMParser } from 'xmldom';
import * as he from 'he';
import { MSHttpClient } from './MSHttpClient';
import { Endpoints } from '../types/endpoint';
import { PackageInstance, ApplicabilityBlob } from '../types/fe3';
import { TypeHelpers } from '../utils/typeHelpers';

export class FE3Handler {
  private static readonly _httpClient = new MSHttpClient();
  private static readonly _msaToken = "<Device>dAA9AEUAdwBBAHcAQQBzAE4AMwBCAEEAQQBVADEAYgB5AHMAZQBtAGIAZQBEAFYAQwArADMAZgBtADcAbwBXAHkASAA3AGIAbgBnAEcAWQBtAEEAQQBMAGoAbQBqAFYAVQB2AFEAYwA0AEsAVwBFAC8AYwBDAEwANQBYAGUANABnAHYAWABkAGkAegBHAGwAZABjADEAZAAvAFcAeQAvAHgASgBQAG4AVwBRAGUAYwBtAHYAbwBjAGkAZwA5AGoAZABwAE4AawBIAG0AYQBzAHAAVABKAEwARAArAFAAYwBBAFgAbQAvAFQAcAA3AEgAagBzAEYANAA0AEgAdABsAC8AMQBtAHUAcgAwAFMAdQBtAG8AMABZAGEAdgBqAFIANwArADQAcABoAC8AcwA4ADEANgBFAFkANQBNAFIAbQBnAFIAQwA2ADMAQwBSAEoAQQBVAHYAZgBzADQAaQB2AHgAYwB5AEwAbAA2AHoAOABlAHgAMABrAFgAOQBPAHcAYQB0ADEAdQBwAFMAOAAxAEgANgA4AEEASABzAEoAegBnAFQAQQBMAG8AbgBBADIAWQBBAEEAQQBpAGcANQBJADMAUQAvAFYASABLAHcANABBAEIAcQA5AFMAcQBhADEAQgA4AGsAVQAxAGEAbwBLAEEAdQA0AHYAbABWAG4AdwBWADMAUQB6AHMATgBtAEQAaQBqAGgANQBkAEcAcgBpADgAQQBlAEUARQBWAEcAbQBXAGgASQBCAE0AUAAyAEQAVwA0ADMAZABWAGkARABUAHoAVQB0AHQARQBMAEgAaABSAGYAcgBhAGIAWgBsAHQAQQBUAEUATABmAHMARQBGAFUAYQBRAFMASgB4ADUAeQBRADgAagBaAEUAZQAyAHgANABCADMAMQB2AEIAMgBqAC8AUgBLAGEAWQAvAHEAeQB0AHoANwBUAHYAdAB3AHQAagBzADYAUQBYAEIAZQA4AHMAZwBJAG8AOQBiADUAQQBCADcAOAAxAHMANgAvAGQAUwBFAHgATgBEAEQAYQBRAHoAQQBYAFAAWABCAFkAdQBYAFEARQBzAE8AegA4AHQAcgBpAGUATQBiAEIAZQBUAFkAOQBiAG8AQgBOAE8AaQBVADcATgBSAEYAOQAzAG8AVgArAFYAQQBiAGgAcAAwAHAAUgBQAFMAZQBmAEcARwBPAHEAdwBTAGcANwA3AHMAaAA5AEoASABNAHAARABNAFMAbgBrAHEAcgAyAGYARgBpAEMAUABrAHcAVgBvAHgANgBuAG4AeABGAEQAbwBXAC8AYQAxAHQAYQBaAHcAegB5AGwATABMADEAMgB3AHUAYgBtADUAdQBtAHAAcQB5AFcAYwBLAFIAagB5AGgAMgBKAFQARgBKAFcANQBnAFgARQBJADUAcAA4ADAARwB1ADIAbgB4AEwAUgBOAHcAaQB3AHIANwBXAE0AUgBBAFYASwBGAFcATQBlAFIAegBsADkAVQBxAGcALwBwAFgALwB2AGUATAB3AFMAawAyAFMAUwBIAGYAYQBLADYAagBhAG8AWQB1AG4AUgBHAHIAOABtAGIARQBvAEgAbABGADYASgBDAGEAYQBUAEIAWABCAGMAdgB1AGUAQwBKAG8AOQA4AGgAUgBBAHIARwB3ADQAKwBQAEgAZQBUAGIATgBTAEUAWABYAHoAdgBaADYAdQBXADUARQBBAGYAZABaAG0AUwA4ADgAVgBKAGMAWgBhAEYASwA3AHgAeABnADAAdwBvAG4ANwBoADAAeABDADYAWgBCADAAYwBZAGoATAByAC8ARwBlAE8AegA5AEcANABRAFUASAA5AEUAawB5ADAAZAB5AEYALwByAGUAVQAxAEkAeQBpAGEAcABwAGgATwBQADgAUwAyAHQANABCAHIAUABaAFgAVAB2AEMAMABQADcAegBPACsAZgBHAGsAeABWAG0AKwBVAGYAWgBiAFEANQA1AHMAdwBFAD0AJgBwAD0A</Device>"; 

  private static GetResourceTextFile(filename: string): string {
    const filePath = path.join(process.cwd(), 'src', 'xml', filename);
    return fs.readFileSync(filePath, 'utf8');
  }

  public static async GetCookieAsync(): Promise<string> {
    const xml = this.GetResourceTextFile('GetCookie.xml');
    
    const response = await this._httpClient.post<string>(
      Endpoints.FE3Delivery.toString(),
      xml,
      { headers: { 'Content-Type': 'application/soap+xml; charset=utf-8' } }
    );

    const doc = new DOMParser().parseFromString(response);
    const nodes = doc.getElementsByTagName("EncryptedData");
    return nodes[0]?.textContent || "";
  }

  public static async SyncUpdatesAsync(WuCategoryID: string, MSAToken: string | null = null): Promise<string> {
    const cookie = await this.GetCookieAsync();
    let xml = this.GetResourceTextFile('WUIDRequest.xml');
    xml = xml.replace('{0}', cookie)
             .replace('{1}', WuCategoryID)
             .replace('{2}', MSAToken || this._msaToken);

    const response = await this._httpClient.post<string>(
      Endpoints.FE3Delivery.toString(),
      xml,
      { headers: { 'Content-Type': 'application/soap+xml; charset=utf-8' } }
    );
    return he.decode(response);
  }

  public static async GetPackageInstancesAsync(content: string): Promise<PackageInstance[]> {
    const packageInstances: PackageInstance[] = [];
    const doc = new DOMParser().parseFromString(content);
    const nodes = doc.getElementsByTagName("AppxMetadata");

    for (let i = 0; i < nodes.length; i++) {
      const node = nodes[i] as any;
      if (node.attributes.length >= 3) {
        const packageInstance: PackageInstance = {
          PackageMoniker: node.getAttribute("PackageMoniker"),
          PackageUri: "http://test.com", // idk why its here
          PackageType: TypeHelpers.StringToPackageType(node.getAttribute("PackageType")),
          ApplicabilityBlob: JSON.parse(node.firstChild.textContent) as ApplicabilityBlob,
          UpdateId: ""
        };
        packageInstances.push(packageInstance);
      }
    }
    return packageInstances;
  }

  public static ProcessUpdateIDs(xml: string) {
    const doc = new DOMParser().parseFromString(xml);
    const updateIDs: string[] = [];
    const revisionIDs: string[] = [];
    const packageNames: string[] = [];

    const nodes = doc.getElementsByTagName("SecuredFragment");
    for (let i = 0; i < nodes.length; i++) {
      const node = nodes[i] as any;
      const identityNode = node.parentNode.parentNode.firstChild;
      updateIDs.push(identityNode.getAttribute("UpdateID"));
      revisionIDs.push(identityNode.getAttribute("RevisionNumber"));
    }

    return { updateIDs, revisionIDs, packageNames };
  }

  public static async GetFileUrlsAsync(
    UpdateIDs: string[], 
    RevisionIDs: string[], 
    MSAToken: string | null = null
  ): Promise<string[]> {
    const uris: string[] = [];
    const template = this.GetResourceTextFile('FE3FileUrl.xml');

    for (let i = 0; i < UpdateIDs.length; i++) {
      const xml = template.replace('{0}', UpdateIDs[i])
                          .replace('{1}', RevisionIDs[i])
                          .replace('{2}', MSAToken || this._msaToken);

      const response = await this._httpClient.post<string>(
        Endpoints.FE3DeliverySecured.toString(),
        xml,
        { headers: { 'Content-Type': 'application/soap+xml; charset=utf-8' } }
      );

      const doc = new DOMParser().parseFromString(response);
      const fileLocations = doc.getElementsByTagName("FileLocation");
      
      for (let j = 0; j < fileLocations.length; j++) {
        const urlNodes = fileLocations[j].getElementsByTagName("Url");
        for (let k = 0; k < urlNodes.length; k++) {
          const url = urlNodes[k].textContent || "";
          // 长度为 99 的通常是 blockmap，进行过滤
          if (url.length !== 99) {
            uris.push(url);
          }
        }
      }
    }
    return uris;
  }
}