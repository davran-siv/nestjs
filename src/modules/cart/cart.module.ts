import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { CartItemModule } from '../cart-item/cart-item.module'
import { CartController } from './cart.controller'
import { CartEntity } from './cart.entity'
import { CartRepository } from './cart.repository'
import { CartService } from './cart.service'

const CartServiceProvider = {provide: 'cartService', useClass: CartService}

@Module({
  imports: [
    TypeOrmModule.forFeature([CartEntity]),
    CartItemModule
  ],
  providers: [CartServiceProvider, CartRepository],
  controllers: [CartController],
  exports: [CartModule, CartServiceProvider]
})
export class CartModule {
}
