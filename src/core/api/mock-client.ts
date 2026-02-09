export class MockClient {
  /**
   * Simulates a network delay
   * @param ms Milliseconds to delay (default: 500ms)
   */
  async delay(ms: number = 500): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  /**
   * Simulates a successful API response
   * @param data Data to return
   * @param delayMs Optional delay override
   */
  async success<T>(data: T, delayMs?: number): Promise<T> {
    await this.delay(delayMs);
    return data;
  }

  /**
   * Simulates an API error
   * @param error Error to throw
   * @param delayMs Optional delay override
   */
  async error(error: Error, delayMs?: number): Promise<never> {
    await this.delay(delayMs);
    throw error;
  }
}
