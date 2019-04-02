import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { CartItemEntity } from './cart-item.entity'
import { CartItemRepository } from './cart-item.repository'
import { CartItemService } from './cart-item.service'

@Module({
  imports: [
    TypeOrmModule.forFeature([CartItemEntity])
  ],
  providers: [CartItemService, CartItemRepository],
  exports: [CartItemModule, CartItemService]
})
export class CartItemModule {
}
