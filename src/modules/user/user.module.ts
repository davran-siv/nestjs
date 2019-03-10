import { Module } from '@nestjs/common'
import { PassportModule } from '@nestjs/passport'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserLocationModule } from '../user-location/user-location.module'
import { UserController } from './user.controller'
import { UserEntity } from './user.entity'
import { UserRepository } from './user.repository'
import { UserService } from './user.service'

@Module({
    imports: [
      TypeOrmModule.forFeature([UserEntity]),
      PassportModule.register({ defaultStrategy: 'jwt' }),
      UserLocationModule
    ],
    controllers: [UserController],
    providers: [UserService, UserRepository],
    exports: [UserModule, UserService]
  }
)
export class UserModule {

}