import { Controller, Get, Post } from '@nestjs/common'
import { UserResponseDTO } from './user.interface'
import { UserService } from './user.service'

@Controller('user')
export class UserController {
  constructor(private readonly service: UserService) {

  }

  @Get(':id')

  @Post()
  createOne(): Promise<UserResponseDTO> {
    return this.service.createOne()
  }

}