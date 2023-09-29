import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import {
  Inject,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

import { LoginUserCommand } from '../commands/login-user.command';
import { UserRepositoryImpl } from '../../../user/infrastructure/persistence/user.repository';
import { UserRepository } from '../../../user/domain/user.repository';
import { OutputLoginDto } from '../../presentation/graphql/dtos/types/output-login.type';
import { UserEntity } from '../../../user/infrastructure/entities/user.entity';

@CommandHandler(LoginUserCommand)
export class LoginUserHandler implements ICommandHandler<LoginUserCommand> {
  constructor(
    @Inject(UserRepositoryImpl)
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async execute(command: LoginUserCommand): Promise<OutputLoginDto> {
    const { email, password } = command;
    const user = await this.userRepository.findByEmail(email);


    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (!(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Email or Password invalid credential');
    }

    return {
      userId: user.id,
      accessToken: this.getTokenForUser(user),
    };
  }

  getTokenForUser(user: UserEntity) {
    return this.jwtService.sign({
      username: user.name,
      sub: user.id,
    });
  }
}
