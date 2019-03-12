import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseGuards } from '@nestjs/common'
import { CreateUserRequestDTO, UpdateUserRequestDTO, UserResponseDTO } from './user.interfaces'
import { UserService } from './user.service'
import { AuthGuard } from '@nestjs/passport'

@Controller('user')
export class UserController {
  constructor(private readonly service: UserService) {

  }

  @Get(':id')
  @HttpCode(200)
  @UseGuards(AuthGuard())
  findOne(@Param('id') id): Promise<UserResponseDTO> {
    return this.service.findOneById(id)
  }

  @Post()
  @HttpCode(201)
  createOne(@Body() dto: CreateUserRequestDTO): Promise<UserResponseDTO> {
    return this.service.createOne(dto)
  }

  @Put(':id')
  updateOne(@Body() dto: UpdateUserRequestDTO): Promise<UserResponseDTO> {
    return this.service.updateOne(dto)
  }

  @Delete(':id')
  removeOne(@Param('id') id): Promise<void> {
    return this.service.removeOne(id)
  }

}