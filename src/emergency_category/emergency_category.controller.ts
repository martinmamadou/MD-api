import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EmergencyCategoryService } from './emergency_category.service';
import { CreateEmergencyCategoryDto } from './dto/create-emergency_category.dto';
import { UpdateEmergencyCategoryDto } from './dto/update-emergency_category.dto';

@Controller('emergency-category')
export class EmergencyCategoryController {
  constructor(private readonly emergencyCategoryService: EmergencyCategoryService) {}

  @Post()
  create(@Body() createEmergencyCategoryDto: CreateEmergencyCategoryDto) {
    return this.emergencyCategoryService.create(createEmergencyCategoryDto);
  }

  @Get()
  findAll() {
    return this.emergencyCategoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.emergencyCategoryService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEmergencyCategoryDto: UpdateEmergencyCategoryDto) {
    return this.emergencyCategoryService.update(+id, updateEmergencyCategoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.emergencyCategoryService.remove(+id);
  }
}
