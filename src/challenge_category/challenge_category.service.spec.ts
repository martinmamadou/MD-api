import { Test, TestingModule } from '@nestjs/testing';
import { ChallengeCategoryService } from './challenge_category.service';

describe('ChallengeCategoryService', () => {
  let service: ChallengeCategoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ChallengeCategoryService],
    }).compile();

    service = module.get<ChallengeCategoryService>(ChallengeCategoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
