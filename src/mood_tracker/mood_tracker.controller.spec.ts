import { Test, TestingModule } from '@nestjs/testing';
import { MoodTrackerController } from './mood_tracker.controller';
import { MoodTrackerService } from './mood_tracker.service';

describe('MoodTrackerController', () => {
  let controller: MoodTrackerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MoodTrackerController],
      providers: [MoodTrackerService],
    }).compile();

    controller = module.get<MoodTrackerController>(MoodTrackerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
