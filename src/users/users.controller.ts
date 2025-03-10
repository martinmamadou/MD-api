import { Controller, Get, Param, Delete, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { AdminGuard } from 'src/auth/guards/admin.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('admin')
  @UseGuards(AdminGuard)
  findAll() {
    return this.usersService.findAll();
  }

  @Delete('admin/:id/delete')
  @UseGuards(AdminGuard)
  deleteOne(@Param('id') idToDelete: number) {
    return this.usersService.deleteOne(idToDelete);
  }
}
