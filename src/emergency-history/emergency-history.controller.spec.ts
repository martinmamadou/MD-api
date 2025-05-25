import { Test, TestingModule } from '@nestjs/testing';
import { EmergencyHistoryController } from './emergency-history.controller';
import { EmergencyHistoryService } from './emergency-history.service';

describe('EmergencyHistoryController', () => {
  let controller: EmergencyHistoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmergencyHistoryController],
      providers: [EmergencyHistoryService],
    }).compile();

    controller = module.get<EmergencyHistoryController>(EmergencyHistoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
