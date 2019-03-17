import { BeforeInsert, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { ProductEntity } from './product.entity'

@Entity('product_images')
export class ProductImageEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ type: 'varchar' })
  url: string

  @ManyToOne(type => ProductEntity)
  @JoinColumn({ name: 'product_id' })
  product: ProductEntity

  @Column({ name: 'created_at', type: 'time without time zone' })
  createdAt: Date

  @BeforeInsert()
  setCreatedAtDate() {
    this.createdAt = new Date()
  }
}