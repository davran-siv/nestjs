import { Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm'
import { CartItemEntity } from './cart-item.entity'
import { UserEntity } from '../../user/user.entity'

@Entity('carts')
export class CartEntity {
  @OneToOne(type => UserEntity, user => user.cart, { primary: true })
  @JoinColumn({ name: 'user_id' })
  user: UserEntity

  @OneToMany(type => CartItemEntity, items => items.cart, { cascade: true })
  items: CartItemEntity
}
