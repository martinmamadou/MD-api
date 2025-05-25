import { Test, TestingModule } from '@nestjs/testing';
import { EmergencyHistoryService } from './emergency-history.service';

describe('EmergencyHistoryService', () => {
  let service: EmergencyHistoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EmergencyHistoryService],
    }).compile();

    service = module.get<EmergencyHistoryService>(EmergencyHistoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
