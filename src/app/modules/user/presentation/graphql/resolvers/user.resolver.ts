import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserDto } from '../dtos/types/user.type';
import { CreateUserInput } from '../dtos/inputs/create-user.input';
import { CommandBus } from '@nestjs/cqrs';
import { CreateUserCommand } from '../../../application/commands/create-user.command';

@Resolver()
export class UserResolver {
  constructor(private readonly commandBus: CommandBus) {}
  @Query(() => String)
  sayHello(): string {
    return 'Hello World!';
  }

  @Mutation(() => UserDto)
  createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    const { name, email, password } = createUserInput;
    return this.commandBus.execute(
      new CreateUserCommand(name, email, password),
    );
  }
}
