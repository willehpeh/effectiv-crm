import { Injectable, Scope } from '@nestjs/common';

@Injectable({
  scope: Scope.REQUEST
})
export class AuthContext {

  private _userId?: string;

  setUserId(userId: string) {
    this._userId = userId;
  }

  userId(): string {
    if (!this._userId) {
      throw new Error('User id is not set');
    }
    return this._userId;
  }
}
