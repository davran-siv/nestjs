import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserController } from './user.controller'
import { UserEntity } from './user.entity'
import { UserRepository } from './user.repository'
import { UserService } from './user.service'
import { PassportModule } from '@nestjs/passport'

@Module({
    imports: [
      TypeOrmModule.forFeature([UserEntity]),
      PassportModule.register({ defaultStrategy: 'jwt' })
    ],
    controllers: [UserController],
    providers: [UserService, UserRepository],
    exports: [UserModule, UserService]
  }
)
export class UserModule {

}