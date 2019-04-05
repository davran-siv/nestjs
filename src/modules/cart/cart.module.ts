import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import Injectables from 'src/consts/Injectables'
import { CartItemModule } from '../cart-item/cart-item.module'
import { CartController } from './cart.controller'
import { CartEntity } from './cart.entity'
import { DefaultCartRepository } from './cart.repository'
import { DefaultCartService } from './cart.service'

const CartServiceProvider = { provide: Injectables.services.cart, useClass: DefaultCartService }
const CartRepositoryProvider = { provide: Injectables.repositories.cart, useClass: DefaultCartRepository }

@Module({
  imports: [
    TypeOrmModule.forFeature([CartEntity]),
    CartItemModule
  ],
  providers: [CartServiceProvider, CartRepositoryProvider],
  controllers: [CartController],
  exports: [CartModule, CartServiceProvider]
})
export class CartModule {
}
