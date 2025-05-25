import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { RewardsCategoryService } from './rewards-category.service';
import { CreateRewardsCategoryDto } from './dto/create-rewards-category.dto';
import { UpdateRewardsCategoryDto } from './dto/update-rewards-category.dto';

@Controller('rewards-category')
export class RewardsCategoryController {
  constructor(private readonly rewardsCategoryService: RewardsCategoryService) {}

  @Post()
  create(@Body() createRewardsCategoryDto: CreateRewardsCategoryDto) {
    return this.rewardsCategoryService.create(createRewardsCategoryDto);
  }

  @Get()
  findAll() {
    return this.rewardsCategoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.rewardsCategoryService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateRewardsCategoryDto: UpdateRewardsCategoryDto) {
    return this.rewardsCategoryService.update(+id, updateRewardsCategoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.rewardsCategoryService.remove(+id);
  }
}
