import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { UserResolver } from './presentation/graphql/resolvers/user.resolver';
import { CreateUserHandler } from './application/command-handlers/create-user.handler';
import { UserRepositoryImpl } from './infrastructure/persistence/user.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './infrastructure/entities/user.entity';

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([UserEntity])],
  providers: [UserResolver, CreateUserHandler, UserRepositoryImpl],
})
export class UserModule {}
