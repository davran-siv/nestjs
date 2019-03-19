import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { CartModule } from '../cart/cart.module'
import { UserLocationModule } from '../user-location/user-location.module'
import { UserController } from './user.controller'
import { UserEntity } from './user.entity'
import { UserRepository } from './user.repository'
import { UserService } from './user.service'

@Module({
    imports: [
      TypeOrmModule.forFeature([UserEntity]),
      UserLocationModule,
      CartModule
    ],
    controllers: [UserController],
    providers: [UserService, UserRepository],
    exports: [UserModule, UserService]
  }
)
export class UserModule {

}