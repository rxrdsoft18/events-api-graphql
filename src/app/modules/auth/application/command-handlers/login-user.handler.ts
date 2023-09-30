import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { JwtService } from '@nestjs/jwt';

import { LoginUserCommand } from '../commands/login-user.command';
import { OutputLoginDto } from '../../presentation/graphql/dtos/types/output-login.type';
import { UserEntity } from '../../../user/infrastructure/entities/user.entity';
import { AuthService } from '../services/auth.service';

@CommandHandler(LoginUserCommand)
export class LoginUserHandler implements ICommandHandler<LoginUserCommand> {
  constructor(
    private readonly jwtService: JwtService,
    private readonly authService: AuthService,
  ) {}

  async execute(command: LoginUserCommand): Promise<OutputLoginDto> {
    const { email, password } = command;
    const user = await this.authService.validateUser(email, password);

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
