import {BadRequestException, Injectable} from '@nestjs/common'
import {httpExceptionMessage} from '../../consts/http-exception-message'
import {UserService} from '../../persistence/user/user.service'
import {UserResponseDto} from './dtos/user.response.dto'

@Injectable()
export class UserDomain {
  constructor(
    private service: UserService,
  ) {}

  async findOneById(id: string): Promise<UserResponseDto> {
    const user = await this.service.findOneById(id)
    if (!user) {
      throw new BadRequestException(httpExceptionMessage.user.notFoundById)
    }
    return UserResponseDto.of(user)
  }
}
