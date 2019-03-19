import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, OneToMany } from 'typeorm'
import { ProductEntity } from '../product/entities/product.entity'
import { UserEntity } from '../user/user.entity'

@Entity('stores')
export class ShopEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ name: 'name_of_shop', type: 'varchar', length: 100 })
  nameOfShop: string

  @Column({ type: 'text' })
  logo: string

  @Column({ type: 'varchar', nullable: true })
  motto: string

  @Column({ name: 'official_email', type: 'varchar', length: 50 })
  officialEmail: string

  @ManyToOne(type => UserEntity)
  @JoinColumn({ name: 'created_by' })
  createdBy: UserEntity

  @ManyToOne(type => UserEntity)
  @JoinColumn({ name: 'owner_id' })
  owner: UserEntity

  @OneToMany(type => ProductEntity, product => product.shop)
  products: ProductEntity[]
}
