import { Module } from '@nestjs/common';
import { MoodTrackerService } from './mood_tracker.service';
import { MoodTrackerController } from './mood_tracker.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MoodTracker } from './entities/mood_tracker.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MoodTracker])],
  controllers: [MoodTrackerController],
  providers: [MoodTrackerService],
})
export class MoodTrackerModule {}
