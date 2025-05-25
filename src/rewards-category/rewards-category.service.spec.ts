import { Test, TestingModule } from '@nestjs/testing';
import { RewardsCategoryService } from './rewards-category.service';

describe('RewardsCategoryService', () => {
  let service: RewardsCategoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RewardsCategoryService],
    }).compile();

    service = module.get<RewardsCategoryService>(RewardsCategoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
