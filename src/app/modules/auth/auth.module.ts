import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthResolver } from './presentation/graphql/resolvers/auth.resolver';
import { LoginUserHandler } from './application/command-handlers/login-user.handler';
import { UserRepositoryImpl } from '../user/infrastructure/persistence/user.repository';
import { UserEntity } from '../user/infrastructure/entities/user.entity';
import { AuthService } from './application/services/auth.service';
import { JwtStrategy } from './presentation/strategies/jwt.strategy';

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature([UserEntity]),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: { expiresIn: `${configService.get('JWT_EXPIRATION')}s` },
      }),
    }),
  ],
  providers: [
    AuthResolver,
    LoginUserHandler,
    UserRepositoryImpl,
    AuthService,
    JwtStrategy,
  ],
})
export class AuthModule {}
