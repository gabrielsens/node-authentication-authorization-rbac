import { makeSignInUseCase } from './makeSignInUseCase';
import { SignInController } from '../controllers/SignInController';

export function makeSignInController() {
  return new SignInController(makeSignInUseCase());
}
