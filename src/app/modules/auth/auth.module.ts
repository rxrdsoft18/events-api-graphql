import { Module } from '@nestjs/common';
import { AuthResolver } from './presentation/graphql/resolvers/auth.resolver';
import { LoginUserHandler } from './application/command-handlers/login-user.handler';
import { JwtModule } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { CqrsModule } from "@nestjs/cqrs";
import { UserRepositoryImpl } from '../user/infrastructure/persistence/user.repository';
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "../user/infrastructure/entities/user.entity";

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
  providers: [AuthResolver, LoginUserHandler, UserRepositoryImpl],
})
export class AuthModule {}
