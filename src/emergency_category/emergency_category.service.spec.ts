import { Test, TestingModule } from '@nestjs/testing';
import { EmergencyCategoryService } from './emergency_category.service';

describe('EmergencyCategoryService', () => {
  let service: EmergencyCategoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EmergencyCategoryService],
    }).compile();

    service = module.get<EmergencyCategoryService>(EmergencyCategoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
