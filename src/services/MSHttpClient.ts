import { CorrelationVector } from '../utils/CorrelationVector';

export class MSHttpClient {
  private cv: CorrelationVector;
  private defaultTimeout: number = 10000;

  constructor() {
    this.cv = new CorrelationVector();
  }

  private async fetchWithCv(url: string, init: RequestInit = {}, timeoutMs?: number): Promise<Response> {
    const headers = new Headers(init.headers as any || {});
    headers.set('MS-CV', this.cv.getValue());
    headers.set('User-Agent', 'StoreLib/1.1');

    this.cv.increment();

    const controller = new AbortController();
    const timeout = timeoutMs ?? this.defaultTimeout;
    const id = setTimeout(() => controller.abort(), timeout);

    try {
      const response = await fetch(url, { ...init, headers, signal: controller.signal });
      return response;
    } finally {
      clearTimeout(id);
    }
  }

  public async get<T>(url: string, init?: RequestInit): Promise<T> {
    const res = await this.fetchWithCv(url, { method: 'GET', ...init });
    const text = await res.text();
    if (!res.ok) throw new Error(`HTTP ${res.status}: ${text}`);
    const contentType = res.headers.get('content-type') || '';
    if (contentType.includes('application/json')) return JSON.parse(text) as T;
    return text as any as T;
  }

  public async getRaw<T>(url: string, init?: RequestInit): Promise<{ status: number; data: T | string; headers: Headers }> {
    const res = await this.fetchWithCv(url, { method: 'GET', ...init });
    const text = await res.text();
    const contentType = res.headers.get('content-type') || '';
    const data = contentType.includes('application/json') ? JSON.parse(text) as T : text;
    return { status: res.status, data, headers: res.headers };
  }

  public async post<T>(url: string, data?: any, init?: RequestInit): Promise<T> {
    const bodyInit = data instanceof FormData || data instanceof URLSearchParams || typeof data === 'string' ? data : JSON.stringify(data);
    const headers = { 'Content-Type': 'application/json', ...(init?.headers as any || {}) };
    const res = await this.fetchWithCv(url, { method: 'POST', body: bodyInit as any, ...init, headers });
    const text = await res.text();
    if (!res.ok) throw new Error(`HTTP ${res.status}: ${text}`);
    const contentType = res.headers.get('content-type') || '';
    if (contentType.includes('application/json')) return JSON.parse(text) as T;
    return text as any as T;
  }
}
