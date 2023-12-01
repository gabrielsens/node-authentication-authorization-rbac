import { compare } from 'bcryptjs';
import { InvalidCredencials } from '../errors/InvalidCredencials';
import { prismaClient } from '../lib/prismaClient';
import { sign } from 'jsonwebtoken';
import { env } from '../config/env';

export class SignInUseCase {
  async execute({ email, password }: IInput): Promise<IOutput> {
    const account = await prismaClient.account.findUnique({
      where: {
        email,
      },
    });

    if (!account) {
      throw new InvalidCredencials('Invalid Credencials');
    }

    if (!(await compare(password, account.password))) {
      throw new InvalidCredencials('Invalid Credencials');
    }

    const accessToken = sign(
      {
        sub: account.id,
        name: account.name,
        email: account.email
      },
      env.jwtSecret,
      {
        expiresIn: '1d'
      }
    );

    return {
      accessToken
    };
  }
}

interface IInput {
  email: string;
  password: string;
}

interface IOutput {
  accessToken: string;
}
