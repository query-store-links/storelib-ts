import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { CorrelationVector } from '../utils/CorrelationVector';
import https from 'https';

export class MSHttpClient {
  private _client: AxiosInstance;
  private cv: CorrelationVector;

  constructor(config?: AxiosRequestConfig) {
    this.cv = new CorrelationVector();
    
    const insecureAgent = new https.Agent({
      rejectUnauthorized: false
    });

    this._client = axios.create({
      ...config,
      httpsAgent: insecureAgent,
      timeout: 10000,
      headers: {
        'User-Agent': 'StoreLib/1.1', 
        ...config?.headers
      }
    });

    this._client.interceptors.request.use((req) => {
      req.headers['MS-CV'] = this.cv.getValue();
      this.cv.increment();
      return req;
    });
  }

  /**
   * 基础 GET：直接返回数据
   */
  public async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this._client.get<T>(url, config);
    return response.data;
  }

  /**
   * 原始 GET：返回完整的 AxiosResponse
   */
  public async getRaw<T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return await this._client.get<T>(url, {
      ...config,
      validateStatus: (status) => status < 500, 
    });
  }

  /**
   * 基础 POST：直接返回数据
   */
  public async post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response = await this._client.post<T>(url, data, config);
    return response.data;
  }
}
