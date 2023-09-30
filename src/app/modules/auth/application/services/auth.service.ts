import {
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserRepositoryImpl } from '../../../user/infrastructure/persistence/user.repository';
import { UserRepository } from '../../../user/domain/user.repository';
import * as bcrypt from 'bcrypt';
import { UserEntity } from '../../../user/infrastructure/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @Inject(UserRepositoryImpl)
    private readonly userRepository: UserRepository,
  ) {}

  async validateUser(email: string, password: string): Promise<UserEntity> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (!(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Email or Password invalid credential');
    }

    return user;
  }

  async getUserById(id: string) {
    return this.userRepository.findById(id);
  }
}
