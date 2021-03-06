import { Global, Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { UserModule } from '../user/user.module'
import { AuthController } from '../../domains/auth/auth.controller'
import { AuthService } from './auth.service'
import { JwtStrategy } from './jwt.strategy'

const passportModule = PassportModule.register({ defaultStrategy: 'jwt' })

@Global()
@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secretOrPrivateKey: 'secretKey'
    }),
    UserModule
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [passportModule]
})
export class AuthModule {
}
