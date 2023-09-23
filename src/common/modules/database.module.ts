import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import ormConfig from '../config/orm.config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: ormConfig,
    }),
  ],
})
export class DatabaseModule {}
