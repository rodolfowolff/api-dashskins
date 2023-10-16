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
import { seconds, Throttle, ThrottlerGuard } from '@nestjs/throttler';

@Controller('users')
@UseGuards(ThrottlerGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @Throttle({ short: { limit: 3, ttl: seconds(1) } })
  create(@Body() body: CreateUserDto) {
    return this.usersService.create(body);
  }

  @Get()
  @Throttle({ medium: { limit: 20, ttl: seconds(10) } })
  findAll() {
    return this.usersService.findAll();
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  @Throttle({ short: { limit: 3, ttl: seconds(1) } })
  update(@Param() param: MongoIDParamDTO, @Body() body: EditUserDto) {
    return this.usersService.update(param.id, body);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @Throttle({ short: { limit: 3, ttl: seconds(1) } })
  delete(@Param() param: MongoIDParamDTO) {
    return this.usersService.delete(param.id);
  }
}
