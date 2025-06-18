import { Controller, Get, Post, Body, Param, Delete, Put, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { RewardsService } from './rewards.service';
import { CreateRewardDto } from './dto/create-reward.dto';
import { UpdateRewardDto } from './dto/update-reward.dto';
import { multerConfig } from '../config/multer.config';

@Controller('rewards')
export class RewardsController {
  constructor(private readonly rewardsService: RewardsService) { }

  @Post('/create')
  create(@Body() createRewardDto: CreateRewardDto) {
    return this.rewardsService.create(createRewardDto);
  }

  @Get()
  findAll() {
    return this.rewardsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.rewardsService.findOne(+id);
  }

  @Put('edit/:id')
  update(@Param('id') id: string, @Body() updateRewardDto: UpdateRewardDto) {
    return this.rewardsService.update(+id, updateRewardDto);
  }

  @Delete('remove/:id')
  remove(@Param('id') id: string) {
    return this.rewardsService.remove(+id);
  }

  @Get('category/:id')
  findCategory(@Param('id') id: string) {
    return this.rewardsService.findByCategory(+id);
  }

  @Post(':id/upload')
  @UseInterceptors(FileInterceptor('file', multerConfig))
  async uploadImage(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.rewardsService.uploadImage(+id, file);
  }
}
