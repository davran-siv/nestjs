import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import * as c from 'config'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { JwtPayloadDto } from './interfaces/jwt.interface'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: c.get('jwtToken.secretKey')
    })
  }

  async validate(payload: JwtPayloadDto) {
    const { exp, iat, ...user } = payload
    // This value will be inserted to req.user
    return user
  }

}
