import { Test, TestingModule } from '@nestjs/testing';
import { RewardsCategoryController } from './rewards-category.controller';
import { RewardsCategoryService } from './rewards-category.service';

describe('RewardsCategoryController', () => {
  let controller: RewardsCategoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RewardsCategoryController],
      providers: [RewardsCategoryService],
    }).compile();

    controller = module.get<RewardsCategoryController>(RewardsCategoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
