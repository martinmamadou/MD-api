import { Module } from '@nestjs/common';
import { ChallengeCategoryService } from './challenge_category.service';
import { ChallengeCategoryController } from './challenge_category.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChallengeCategory } from './entities/challenge_category.entity';
import { Challenge } from 'src/challenge/entities/challenge.entity';
@Module({
  imports: [TypeOrmModule.forFeature([ChallengeCategory, Challenge])],
  controllers: [ChallengeCategoryController],
  providers: [ChallengeCategoryService],
})
export class ChallengeCategoryModule {}
