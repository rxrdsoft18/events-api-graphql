import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CommandBus } from '@nestjs/cqrs';
import { LoginUserDto } from '../dtos/inputs/login-user.dto';
import { LoginUserCommand } from '../../../application/commands/login-user.command';
import { OutputLoginDto } from '../dtos/types/output-login.type';

@Resolver()
export class AuthResolver {
  constructor(private readonly commandBus: CommandBus) {}

  @Mutation(() => OutputLoginDto)
  async login(@Args('loginUserDto') loginUserDto: LoginUserDto) {
    const { email, password } = loginUserDto;
    return this.commandBus.execute(new LoginUserCommand(email, password));
  }
}
