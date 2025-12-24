export class CorrelationVector {
  private base: string;
  private extension: number;

  constructor() {
    const bytes = crypto.getRandomValues(new Uint8Array(12));
    let binary = '';
    for (let i = 0; i < bytes.length; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    this.base = btoa(binary).substring(0, 16);
    this.extension = 0;
  }

  public getValue(): string {
    return `${this.base}.${this.extension}`;
  }

  public increment(): void {
    this.extension++;
  }
}