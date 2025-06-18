import { Test, TestingModule } from '@nestjs/testing';
import { EmergencyCategoryController } from './emergency_category.controller';
import { EmergencyCategoryService } from './emergency_category.service';

describe('EmergencyCategoryController', () => {
  let controller: EmergencyCategoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmergencyCategoryController],
      providers: [EmergencyCategoryService],
    }).compile();

    controller = module.get<EmergencyCategoryController>(EmergencyCategoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
