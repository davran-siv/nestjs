import { Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm'
import { CartItemEntity } from '../cart-item/cart-item.entity'
import { UserEntity } from '../user/user.entity'

@Entity('carts')
export class CartEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @OneToOne(type => UserEntity, user => user.cart)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity

  @OneToMany(type => CartItemEntity, items => items.cart, { eager: true })
  items: CartItemEntity[]
}
