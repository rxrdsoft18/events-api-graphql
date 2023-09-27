import { Logger } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";

import { UserRepository } from "../../domain/user.repository";
import { UserEntity } from "../entities/user.entity";
import { User } from "../../domain/user";

export class UserRepositoryImpl implements UserRepository {
  private readonly logger = new Logger(UserRepositoryImpl.name);

  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  findByEmail(email: string): Promise<UserEntity> {
    return this.userRepository.findOneBy({
      email,
    });
  }
  async save(user: User): Promise<UserEntity> {
    const userEntity = new UserEntity();
    userEntity.email = user.properties().email;
    userEntity.name = user.properties().name;
    userEntity.password = user.properties().password;

    return this.userRepository.save(userEntity);
  }
}
