import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { ChallengeService } from './challenge.service';
import { CreateChallengeDto } from './dto/create-challenge.dto';
import { UpdateChallengeDto } from './dto/update-challenge.dto';

@Controller('challenges')
export class ChallengeController {
  constructor(private readonly challengeService: ChallengeService) { }

  @Post('/create/admin')
  create(@Body() createChallengeDto: CreateChallengeDto) {
    return this.challengeService.create(createChallengeDto);
  }

  @Get()
  findAll() {
    return this.challengeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.challengeService.findOne(+id);
  }

  @Put('edit/admin/:id')
  update(@Param('id') idToUpdate: string, @Body() updateChallengeDto: UpdateChallengeDto) {
    return this.challengeService.updateOne(+idToUpdate, updateChallengeDto);
  }

  @Delete('remove/:id')
  remove(@Param('id') idToDelete: string) {
    return this.challengeService.deleteOne(+idToDelete);
  }

  @Get('target/:target')
  findByTarget(@Param('target') target: string) {
    return this.challengeService.findByTarget(target);
  }
  
  @Get('category/:category')
  findByCategory(@Param('category') categoryId: number) {
    return this.challengeService.findByCategory(categoryId);
  }
}
