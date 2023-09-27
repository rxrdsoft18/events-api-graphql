import { User } from './user';
import { UserEntity } from '../infrastructure/entities/user.entity';

export interface UserRepository {
  save(user: User): Promise<UserEntity>;
  findByEmail(email: string): Promise<UserEntity>;
}
