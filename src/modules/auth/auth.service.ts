import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import * as c from 'config'
import { generateTokesPair } from '../../utils/jwt.util'
import { hashPassword, validatePassword } from '../../utils/password.util'
import { UserService } from '../user/user.service'
import { AuthJwtTokesDTO, JwtPayloadDTO } from './interfaces/jwt.interface'
import { LoginByCredentialsDTO } from './interfaces/login.interface'

@Injectable()
export class AuthService {
  constructor(
    // private readonly jwtService: JwtService,
    private readonly userService: UserService
  ) {
  }

  async loginByCredentials(dto: LoginByCredentialsDTO): Promise<AuthJwtTokesDTO> {
    const user = await this.userService.findOneByEmailOrUsernameWithPassword(dto.emailOrUsername)
    if (!user) {
      throw new UnauthorizedException('Credentials are wrong')
    }
    if (!await validatePassword(dto.password, user.password)) {
      throw new UnauthorizedException('Credentials are wrong')
    }
    return generateTokesPair({
      user,
      accessExpiresIn: c.get('jwtToken.accessTokenExpiresIn'),
      refreshExpiresIn: c.get('jwtToken.refreshTokenExpiresIn')
    })
  }

  async validateUser(payload: JwtPayloadDTO): Promise<any> {
    // put some validation logic here
    // for example query user by id/email/username
    return {}
  }
}
