import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseGuards } from '@nestjs/common'
import {UserResponseDto} from './dtos/user.response.dto'
import {UserDomain} from './user.domain'
import { UserCreateRequestDTO, UserUpdateRequestDTO } from './dtos/user.mutation.dto'
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
  createOne(@Body() dto: UserCreateRequestDTO): Promise<UserResponseDto> {
    return this.domain.createOne(dto)
  }

  @Put(':id')
  updateOne(@Body() dto: UserUpdateRequestDTO): Promise<UserResponseDto> {
    return this.domain.updateOne(dto)
  }

  @Delete(':id')
  removeOne(@Param('id') id): Promise<void> {
    return this.domain.removeOne(id)
  }

}
