import { Injectable } from '@nestjs/common';
import { AsyncLocalStorage } from 'async_hooks';

interface RequestStore {
  correlationId: string;
}

@Injectable()
export class RequestContext {
  private readonly asyncLocalStorage = new AsyncLocalStorage<RequestStore>();

  run<T>(store: RequestStore, callback: () => T): T {
    return this.asyncLocalStorage.run(store, callback);
  }

  correlationId(): string {
    const store = this.asyncLocalStorage.getStore();
    if (!store?.correlationId) {
      throw new Error('Correlation id is not set');
    }
    return store.correlationId;
  }
}
