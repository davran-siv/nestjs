import { BeforeInsert, BeforeUpdate, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { CartEntity } from '../cart/cart.entity'
import { ProductEntity } from '../product/entities/product.entity'

@Entity('cart_items')
export class CartItemEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ type: 'integer', default: 0 })
  amount: number

  @ManyToOne(type => ProductEntity, { eager: true })
  @JoinColumn({ name: 'product_id' })
  product: ProductEntity

  @ManyToOne(type => CartEntity, cart => cart.items)
  @JoinColumn({ name: 'cart_id' })
  cart: CartEntity

  @Column({ name: 'created_at', type: 'time with time zone' })
  createdAt: Date

  @Column({ name: 'updated_at', type: 'time with time zone', nullable: true })
  updatedAt: Date

  @BeforeInsert()
  setCreatedAtDate() {
    this.createdAt = new Date()
  }

  @BeforeUpdate()
  setUpdatedAtDate() {
    this.updatedAt = new Date()
  }
}
