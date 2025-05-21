import { Controller, Get, Param, Delete, UseGuards, Request, Put, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { AdminGuard } from 'src/auth/guards/admin.guard';
import { User } from './users.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

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

  @Put('edit/:id')
  update(@Param('id') id: number, @Body() updateData: Partial<User>) {
    return this.usersService.update(id, updateData);
  }

  @Get('connected')
  getUserConnected(@Request() req) {
    return this.usersService.getUserConnected(req.user.id);
  }
}
