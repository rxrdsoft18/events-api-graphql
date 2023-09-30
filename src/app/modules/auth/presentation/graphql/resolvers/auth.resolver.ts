import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CommandBus } from '@nestjs/cqrs';
import { LoginUserDto } from '../dtos/inputs/login-user.dto';
import { LoginUserCommand } from '../../../application/commands/login-user.command';
import { OutputLoginDto } from '../dtos/types/output-login.type';
import { JwtAuthGqlGuard } from '../../guards/jwt-auth-gql.guard';
import { UseGuards } from '@nestjs/common';
import { UserMeDto } from '../dtos/types/userMeDto';

@Resolver()
export class AuthResolver {
  constructor(private readonly commandBus: CommandBus) {}

  @Mutation(() => OutputLoginDto)
  async login(@Args('loginUserDto') loginUserDto: LoginUserDto) {
    const { email, password } = loginUserDto;
    return this.commandBus.execute(new LoginUserCommand(email, password));
  }

  @Query(() => UserMeDto)
  @UseGuards(JwtAuthGqlGuard)
  async me(@Context() ctx: any) {
    const user = ctx.req.user;
    return {
      id: user.id,
      name: user.name,
      email: user.email,
    };
  }
}
