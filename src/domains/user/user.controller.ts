import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseGuards } from '@nestjs/common'
import {UserResponseDto} from './dtos/user.response.dto'
import {UserDomain} from './user.domain'
import { CreateUserRequestDTO, UpdateUserRequestDTO } from './dtos/user.mutation.dto'
import { AuthGuard } from '@nestjs/passport'

@Controller('user')
export class UserController {
  constructor(private readonly domain: UserDomain) {

  }

  @Get(':id')
  @HttpCode(200)
  @UseGuards(AuthGuard())
  findOneById(@Param('id') id): Promise<UserResponseDto> {
    return this.domain.findOneById(id)
  }

  @Post()
  @HttpCode(201)
  createOne(@Body() dto: CreateUserRequestDTO): Promise<UserResponseDto> {
    return this.service.createOne(dto)
  }

  @Put(':id')
  updateOne(@Body() dto: UpdateUserRequestDTO): Promise<UserResponseDto> {
    return this.service.updateOne(dto)
  }

  @Delete(':id')
  removeOne(@Param('id') id): Promise<void> {
    return this.service.removeOne(id)
  }

}
