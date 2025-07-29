export class AuthContext {
  constructor(private readonly _userId: string) {}

  userId(): string {
    return this._userId;
  }
}
