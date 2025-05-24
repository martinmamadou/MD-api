import { Test, TestingModule } from '@nestjs/testing';
import { ChallengeCategoryController } from './challenge_category.controller';
import { ChallengeCategoryService } from './challenge_category.service';

describe('ChallengeCategoryController', () => {
  let controller: ChallengeCategoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ChallengeCategoryController],
      providers: [ChallengeCategoryService],
    }).compile();

    controller = module.get<ChallengeCategoryController>(ChallengeCategoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
