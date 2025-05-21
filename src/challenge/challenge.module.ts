import { Module } from '@nestjs/common';
import { ChallengeService } from './challenge.service';
import { ChallengeController } from './challenge.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Challenge } from './entities/challenge.entity';
import { UserChallenge } from 'src/user_challenge/entities/user_challenge.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Challenge, UserChallenge])],
  controllers: [ChallengeController],
  providers: [ChallengeService],
})
export class ChallengeModule { }
