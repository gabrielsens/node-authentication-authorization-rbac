import { IController, IRequest, IResponse }  from '../application/interfaces/IController';
import { SignUpUseCase } from '../application/useCases/SignUpUseCase';
import { ZodError, z } from 'zod';
import { AccountAlreadyExists } from '../application/errors/AccountAlreadyExists';

const schema = z.object({
  name: z.string(),
  email: z.string().email().min(2),
  password: z.string().min(8)
});

export class SignUpController implements IController {
  constructor(private readonly signUpUseCase: SignUpUseCase) {}

  async handle({ body }: IRequest): Promise<IResponse> {
    try {
      const { email, name, password } = schema.parse(body);
      await this.signUpUseCase.execute({ email, name, password });

      return {
        statusCode: 204,
        body: null
      };
    } catch (error) {
      if (error instanceof ZodError) {
        return {
          statusCode: 400,
          body: error.issues
        };
      }
      if (error instanceof AccountAlreadyExists) {
        return {
          statusCode: 409,
          body: {
            message: error.message
          }
        };
      }

      throw error;
    }
  }

}
