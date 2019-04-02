import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { CartItemModule } from '../cart-item/cart-item.module'
import { CartController } from './cart.controller'
import { CartEntity } from './cart.entity'
import { CartRepository } from './cart.repository'
import { CartService } from './cart.service'

@Module({
  imports: [
    TypeOrmModule.forFeature([CartEntity]),
    CartItemModule
  ],
  providers: [CartService, CartRepository],
  controllers: [CartController],
  exports: [CartModule, CartService]
})
export class CartModule {
}
