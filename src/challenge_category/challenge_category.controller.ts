import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ChallengeCategoryService } from './challenge_category.service';
import { CreateChallengeCategoryDto } from './dto/create-challenge_category.dto';
import { UpdateChallengeCategoryDto } from './dto/update-challenge_category.dto';

@Controller('challenge-category')
export class ChallengeCategoryController {
  constructor(private readonly challengeCategoryService: ChallengeCategoryService) { }

  @Post()
  create(@Body() createChallengeCategoryDto: CreateChallengeCategoryDto) {
    return this.challengeCategoryService.create(createChallengeCategoryDto);
  }

  @Get()
  findAll() {
    return this.challengeCategoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.challengeCategoryService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateChallengeCategoryDto: UpdateChallengeCategoryDto) {
    return this.challengeCategoryService.update(+id, updateChallengeCategoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.challengeCategoryService.remove(+id);
  }
}
