import { IController, IRequest, IResponse }  from '../application/interfaces/IController';
import { SignInUseCase } from '../application/useCases/SignInUseCase';
import { ZodError, z } from 'zod';
import { InvalidCredencials } from '../application/errors/InvalidCredencials';

const schema = z.object({
  email: z.string().email().min(2),
  password: z.string().min(8)
});

export class SignInController implements IController {
  constructor(private readonly signInUseCase: SignInUseCase) {}

  async handle({ body }: IRequest): Promise<IResponse> {
    try {
      const { email, password } = schema.parse(body);
      const acessToken = await this.signInUseCase.execute({ email, password });

      return {
        statusCode: 200,
        body: {
          acessToken
        }
      };
    } catch (error) {
      if (error instanceof ZodError) {
        return {
          statusCode: 400,
          body: error.issues
        };
      }

      if (error instanceof InvalidCredencials) {
        return {
          statusCode: 401,
          body: {
            message: error.message
          }
        };
      }

      throw error;
    }
  }

}
