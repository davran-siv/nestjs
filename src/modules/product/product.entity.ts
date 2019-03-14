import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { ProductCategoryEntity } from '../product-category/product-category.entity'
import { UserEntity } from '../user/user.entity'

@Entity('products')
export class ProductEntity {
  @PrimaryGeneratedColumn()
  id: string

  @Column({ name: 'product_name', type: 'varchar', length: 255 })
  productName: string

  @Column({ type: 'varchar', length: 255 })
  title: string

  @Column({ type: 'varchar', length: 255 })
  description: string

  @Column({ name: 'is_in_stock', type: 'boolean' })
  isInStock: string

  @Column({ name: 'made_of', type: 'text', nullable: false })
  madeOf: string

  @Column({ name: 'manufacturing_process', type: 'text', nullable: false })
  manufacturingProcess: string

  @Column({ name: 'created_at', type: 'time without time zone' })
  createdAt: Date

  @Column({ name: 'updated_at', type: 'time without time zone' })
  updatedAt: Date

  @ManyToOne(type => UserEntity, user => user.products)
  @JoinColumn({ name: 'created_by' })
  createdBy: UserEntity

  @ManyToOne(type => ProductCategoryEntity, category => category.products)
  @JoinColumn({ name: 'category_id' })
  category: ProductCategoryEntity
}
