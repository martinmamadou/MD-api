import { Module } from '@nestjs/common';
import { ChallengeService } from './challenge.service';
import { ChallengeController } from './challenge.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Challenge } from './entities/challenge.entity';
import { UserChallenge } from 'src/user_challenge/entities/user_challenge.entity';
import { ChallengeCategory } from 'src/challenge_category/entities/challenge_category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Challenge, UserChallenge, ChallengeCategory])],
  controllers: [ChallengeController],
  providers: [ChallengeService],
})
export class ChallengeModule { }
