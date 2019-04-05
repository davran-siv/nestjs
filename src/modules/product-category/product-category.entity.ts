import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { ProductEntity } from '../product/entities/product.entity'

@Entity('product_categories')
export class ProductCategoryEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ name: 'category_name', type: 'varchar', length: 100 })
  categoryName: string

  @Column({ name: 'is_active', type: 'boolean' })
  isActive: boolean

  @OneToMany(type => ProductCategoryEntity, category => category.parentCategory)
  childCategories: ProductCategoryEntity[]

  @ManyToOne(type => ProductCategoryEntity, category => category.childCategories, { nullable: true })
  @JoinColumn({ name: 'parent_category_id' })
  parentCategory: ProductCategoryEntity

  @OneToMany(type => ProductEntity, product => product.category)
  products: ProductEntity
}
