import {Injectable, UnauthorizedException} from '@nestjs/common'
import {JwtService} from '@nestjs/jwt'
import {httpExceptionMessage} from '../../consts/http-exception-message'
import {validatePassword} from '../../utils/password.util'
import {UserEntity} from '../user/user.entity'
import {UserService} from '../user/user.service'
import {AuthJwtTokesDto, JwtRefreshTokenPayloadDto} from './interfaces/jwt.interface'
import {LoginByCredentialsDto, RefreshTokenDto} from './interfaces/login.interface'
import uuid = require('uuid')

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {
  }

  async loginByCredentials(dto: LoginByCredentialsDto): Promise<AuthJwtTokesDto> {
    const user = await this.userService.findOneByEmailOrUsernameWithPassword(dto.emailOrUsername)
    if (!user) {
      throw new UnauthorizedException(httpExceptionMessage.auth.credentialsAreWrong)
    }
    if (!await validatePassword(dto.password, user.password!)) {
      throw new UnauthorizedException(httpExceptionMessage.auth.credentialsAreWrong)
    }
    return this.generateTokensPair(user)
  }

  async refreshToken(dto: RefreshTokenDto): Promise<AuthJwtTokesDto> {
    const refreshTokenPayload = await this.jwtService.verifyAsync<JwtRefreshTokenPayloadDto>(dto.refreshToken)
                                          .catch(e => {
                                            throw new UnauthorizedException()
                                          })
    const user = await this.userService.findOneById(refreshTokenPayload.id)
    return this.generateTokensPair(user)
  }

  private generateTokensPair(user: UserEntity) {
    const accessToken = this.generateAccessToken(user)
    const refreshToken = this.generateRefreshToken(user.id)
    return {
      accessToken,
      refreshToken,
    }
  }

  private generateAccessToken(user: UserEntity): string {
    return this.jwtService.sign(this.getAccessTokenPayload(user), {
      expiresIn: '3600',
    })
  }

  private generateRefreshToken(userId: string): string {
    const jwtid = uuid.v4()
    return this.jwtService.sign({
      id: userId,
    }, {
      jwtid,
      expiresIn: '3600',
    })
  }

  private getAccessTokenPayload(user: UserEntity) {
    return {
      id: user.id,
      email: user.emailAddress,
      username: user.username,
    }
  }
}
