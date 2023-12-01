import { hash } from 'bcryptjs';
import { AccountAlreadyExists } from '../errors/AccountAlreadyExists';
import { prismaClient } from '../lib/prismaClient';

export class SignUpUseCase {
  async execute({ name, email, password }: IInput): Promise<IOutput> {
    const accountAlreadyExist = await prismaClient.account.findUnique({
      where: {
        email,
      },
    });

    if (accountAlreadyExist) {
      throw new AccountAlreadyExists('Email already exists');
    }

    const salt = 8;
    const hashedPassword = await hash(password, salt);

    await prismaClient.account.create({
      data: {
        name,
        email,
        password: hashedPassword
      }
    });
  }
}

interface IInput {
  name: string;
  email: string;
  password: string;
}

type IOutput = void;
