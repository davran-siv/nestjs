import { Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm'
import { UserEntity } from '../../user/user.entity'
import { CartItemEntity } from './cart-item.entity'

@Entity('carts')
export class CartEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @OneToOne(type => UserEntity, user => user.cart, { primary: true })
  @JoinColumn({ name: 'user_id' })
  user: UserEntity

  @OneToMany(type => CartItemEntity, items => items.cart)
  items: CartItemEntity[]
}
