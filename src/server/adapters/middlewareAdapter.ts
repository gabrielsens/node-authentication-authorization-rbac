import { NextFunction, Request, Response } from 'express';
import { IMiddleware } from '../../application/interfaces/IMiddleware';

export function middlewareAdapter(middleware: IMiddleware) {
  return async (request: Request, response: Response, next: NextFunction) => {
    const result = await middleware.handle({
      headers: request.headers
    });

    if ('statusCode' in result) {
      response.status(result.statusCode).json(result.body);
    }
    if ('data' in result) {
      request.metadata = {
        ...request.metadata,
        accountId: result.data.accountId
      };
    }

    next();
  };
}
