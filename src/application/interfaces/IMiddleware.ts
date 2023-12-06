import { IncomingHttpHeaders } from 'http';

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IRequest {
  headers: IncomingHttpHeaders;
}

export interface IResponse {
  statusCode: number;
  body: Record<string, any> | null;
}

export interface IData {
  data: Record<string, any>;
}

export interface IMiddleware {
  handle(request: IRequest): Promise<IResponse | IData>
}
