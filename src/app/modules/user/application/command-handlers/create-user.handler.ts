import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ConflictException, Inject, Logger } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import * as bcrypt from 'bcrypt';

import { CreateUserCommand } from '../commands/create-user.command';
import { UserDto } from '../../presentation/graphql/dtos/types/user.type';
import { UserRepository } from '../../domain/user.repository';
import { UserRepositoryImpl } from '../../infrastructure/persistence/user.repository';
import { User } from '../../domain/user';

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
  private readonly logger = new Logger(CreateUserHandler.name);

  constructor(
    @Inject(UserRepositoryImpl)
    private readonly userRepository: UserRepository,
  ) {}
  async execute(command: CreateUserCommand): Promise<UserDto> {
    const { name, email, password } = command;

    const existsUser = await this.userRepository.findByEmail(email);

    if (existsUser) {
      throw new ConflictException('Email already taken');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      id: uuidv4(),
      name,
      email,
      password: hashedPassword,
    });
    return this.userRepository.save(user);
  }
}
