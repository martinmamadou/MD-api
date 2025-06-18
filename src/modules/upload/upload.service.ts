import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Image } from './entities/image.entity';

@Injectable()
export class UploadService {
  constructor(
    @InjectRepository(Image)
    private imageRepository: Repository<Image>,
  ) { }

  async saveImage(file: Express.Multer.File): Promise<Image> {
    const image = new Image();
    image.filename = file.filename;
    image.path = file.path;
    image.mimetype = file.mimetype;
    image.size = file.size;

    return this.imageRepository.save(image);
  }

  async getImage(id: number): Promise<Image> {
    return this.imageRepository.findOne({ where: { id } });
  }
}