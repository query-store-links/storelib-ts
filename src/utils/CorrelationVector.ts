import * as crypto from 'crypto'; 

export class CorrelationVector {
  private base: string;
  private extension: number;

  constructor() {
    this.base = crypto.randomBytes(12).toString('base64').substring(0, 16);
    this.extension = 0;
  }

  public getValue(): string {
    return `${this.base}.${this.extension}`;
  }

  public increment(): void {
    this.extension++;
  }
}