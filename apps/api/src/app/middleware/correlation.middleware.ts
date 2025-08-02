import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { RequestContext } from '@effectiv-crm/infrastructure';

@Injectable()
export class CorrelationMiddleware implements NestMiddleware {
  constructor(private readonly requestContext: RequestContext) {
  }
  use(req: Request, res: Response, next: NextFunction): void {
    this.requestContext.setCorrelationId(crypto.randomUUID());
    next();
  }

}
