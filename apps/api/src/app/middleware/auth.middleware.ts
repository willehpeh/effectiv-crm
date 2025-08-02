import { Injectable, NestMiddleware } from '@nestjs/common';
import { AuthContext } from '@effectiv-crm/infrastructure';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly authContext: AuthContext) {
  }
  use(req: Request, res: Response, next: NextFunction): void {
    this.authContext.setUserId('temp-user-id');
    next();
  }

}
