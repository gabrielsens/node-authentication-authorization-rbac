import { hash } from 'bcryptjs';
import { AccountAlreadyExists } from '../errors/AccountAlreadyExists';
import { prismaClient } from '../lib/prismaClient';

export class SignUpUseCase {
  constructor (private readonly salt: number) {}
  async execute({ name, email, password }: IInput): Promise<IOutput> {
    const accountAlreadyExist = await prismaClient.account.findUnique({
      where: {
        email,
      },
    });

    if (accountAlreadyExist) {
      throw new AccountAlreadyExists('Email already exists');
    }

    const hashedPassword = await hash(password, this.salt);

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
