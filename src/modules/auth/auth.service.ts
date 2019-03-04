import { Injectable, UnauthorizedException, NotFoundException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import * as c from 'config'
import { validatePassword } from '../../utils/password.util'
import { UserResponseDTO } from '../user/user.interface'
import { UserService } from '../user/user.service'
import { AuthJwtTokesDto, JwtPayloadDto, JwtRefreshTokenPayloadDto } from './interfaces/jwt.interface'
import { LoginByCredentialsDto, RefreshTokenDto } from './interfaces/login.interface'
import uuid = require('uuid')

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService
  ) {
  }

  async loginByCredentials(dto: LoginByCredentialsDto): Promise<AuthJwtTokesDto> {
    const user = await this.userService.findOneByEmailOrUsernameWithPassword(dto.emailOrUsername)
    if (!user) {
      throw new UnauthorizedException('Credentials are wrong')
    }
    if (!await validatePassword(dto.password, user.password)) {
      throw new UnauthorizedException('Credentials are wrong')
    }
    return this.generateTokensPair(user)
  }

  async refreshToken(dto: RefreshTokenDto): Promise<AuthJwtTokesDto> {
    const refreshTokenPayload = this.jwtService.verify<JwtRefreshTokenPayloadDto>(dto.refreshToken)
    const user = await this.userService.findOneById(refreshTokenPayload.id)
    if (!user) {
      throw new NotFoundException()
    }
    return this.generateTokensPair(user)
  }

  private generateTokensPair(user: UserResponseDTO) {
    const jwtid = uuid.v4()
    const payload = {
      id: user.id,
      email: user.emailAddress,
      username: user.username
    }
    const accessToken = this.jwtService.sign(payload, {
      expiresIn: c.get('jwtToken.accessTokenExpiresIn')
    })
    const refreshToken = this.jwtService.sign({
      id: user.id
    }, {
      jwtid,
      expiresIn: c.get('jwtToken.refreshTokenExpiresIn')
    })
    return {
      accessToken,
      refreshToken
    }
  }
}
