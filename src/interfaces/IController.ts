/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IRequest {
  body: Record<string, any>;
}

export interface IResponse {
  statusCode: number;
  body: Record<string, any> | null;
}

export interface IController {
  handle(request: IRequest): Promise<IResponse>
}
