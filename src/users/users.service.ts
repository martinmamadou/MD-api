import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { User } from './users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOneByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOneBy({ email });
  }

  findOneById(id: number): Promise<User | null> {
    return this.usersRepository.findOneBy({ id: id });
  }

  async findOne(id: number) {
    return this.usersRepository.findOneBy({ id: id });
  }

  create(user: User): Promise<User> {
    return this.usersRepository.save(user);
  }

  update(id: number, data: Partial<User>): Promise<UpdateResult> {
    return this.usersRepository.update(id, data);
  }

  async deleteOne(user_id: number): Promise<User | null> {
    const user = await this.usersRepository.findOne({ where: { id: user_id } });
    await this.usersRepository.delete(user_id);
    return user;
  }
}
