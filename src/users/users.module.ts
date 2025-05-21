import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { User } from './users.entity';
import { UsersController } from './users.controller';
import { UserChallenge } from 'src/user_challenge/entities/user_challenge.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, UserChallenge])],
  providers: [UsersService],
  exports: [TypeOrmModule, UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
