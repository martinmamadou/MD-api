import { Module } from '@nestjs/common';
import { UserChallengeService } from './user_challenge.service';
import { UserChallengeController } from './user_challenge.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserChallenge } from './entities/user_challenge.entity';
import { Challenge } from 'src/challenge/entities/challenge.entity';
import { User } from 'src/users/users.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserChallenge, User, Challenge])],
  controllers: [UserChallengeController],
  providers: [UserChallengeService],
})
export class UserChallengeModule { }
