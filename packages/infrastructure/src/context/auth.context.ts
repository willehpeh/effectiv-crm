import { Injectable } from '@nestjs/common';
import { AsyncLocalStorage } from 'async_hooks';

interface AuthStore {
  userId: string;
}

@Injectable()
export class AuthContext {
  private readonly asyncLocalStorage = new AsyncLocalStorage<AuthStore>();

  run<T>(store: AuthStore, callback: () => T): T {
    return this.asyncLocalStorage.run(store, callback);
  }

  userId(): string {
    const store = this.asyncLocalStorage.getStore();
    if (!store?.userId) {
      throw new Error('User id is not set');
    }
    return store.userId;
  }
}
