import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { CartController } from './cart.controller'
import { CartRepository } from './cart.repository'
import { CartService } from './cart.service'
import { CartEntity } from './entities/cart.entity'

@Module({
  imports: [
    TypeOrmModule.forFeature([CartEntity])
  ],
  providers: [CartService, CartRepository],
  controllers: [CartController],
  exports: [CartModule, CartService]
})
export class CartModule {
}
