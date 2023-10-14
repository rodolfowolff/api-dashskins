import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { MongoIDParamDTO } from '@/common/mongoIdParam';
import { EditUserDto } from './dto/edit-user.dto';
import { AuthGuard } from '@/auth/guard/auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @UseGuards(AuthGuard)
  @Post()
  create(@Body() body: CreateUserDto) {
    return this.usersService.create(body);
  }

  @UseGuards(AuthGuard)
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @UseGuards(AuthGuard)
  @Put(':id')
  update(@Param() param: MongoIDParamDTO, @Body() body: EditUserDto) {
    return this.usersService.update(param.id, body);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  delete(@Param() param: MongoIDParamDTO) {
    return this.usersService.delete(param.id);
  }
}
