import { Controller, Post, Get, UploadedFile, UseInterceptors, Param } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadService } from './upload.service';
import { multerConfig } from '../../config/multer.config';

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) { }

  @Post('image')
  @UseInterceptors(FileInterceptor('file', multerConfig))
  async uploadImage(@UploadedFile() file: Express.Multer.File) {
    return this.uploadService.saveImage(file);
  }

  @Get('image/:id')
  async getImage(@Param('id') id: number) {
    return this.uploadService.getImage(id);
  }
}