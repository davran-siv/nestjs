import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from 'typeorm'
import { ManufacturingMaterialEntity } from '../../manufacturing-material/manufacturing-material.entity'
import { ProductCategoryEntity } from '../../product-category/product-category.entity'
import { ShopEntity } from '../../shop/shop.entity'
import { UserEntity } from '../../user/user.entity'
import { ProductImageEntity } from './product-image.entity'

@Entity('products')
export class ProductEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ name: 'product_name', type: 'varchar', length: 255 })
  productName: string

  @Column({ type: 'varchar', length: 255 })
  title: string

  @Column({ type: 'varchar', length: 255 })
  description: string

  @Column({ name: 'is_in_stock', type: 'boolean' })
  isInStock: boolean

  @Column({ type: 'integer' })
  height: number

  @Column({ type: 'integer' })
  width: number

  @Column({ type: 'integer' })
  length: number

  @Column({ type: 'integer' })
  weight: number

  @Column({ name: 'manufacturing_process', type: 'text', nullable: false })
  manufacturingProcess: string

  @ManyToMany(type => ManufacturingMaterialEntity, { cascade: true })
  @JoinTable({
    name: 'products_made_of_manufacturing_materials',
    joinColumn: { name: 'product_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'manufacturing_material_id', referencedColumnName: 'id' }
  })
  madeOf: ManufacturingMaterialEntity[]

  @ManyToOne(type => UserEntity, user => user.products)
  @JoinColumn({ name: 'created_by' })
  createdBy: UserEntity

  @ManyToOne(type => ProductCategoryEntity, category => category.products)
  @JoinColumn({ name: 'category_id' })
  category: ProductCategoryEntity

  @OneToMany(type => ProductImageEntity, image => image, { cascade: true })
  images: ProductImageEntity[]

  @ManyToOne(type => ShopEntity, shop => shop.products)
  @JoinColumn({ name: 'shop_id' })
  shop: ShopEntity

  @Column({ name: 'created_at', type: 'time with time zone', readonly: true })
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
