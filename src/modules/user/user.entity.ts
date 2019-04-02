import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn
} from 'typeorm'
import { CartEntity } from '../cart/cart.entity'
import { CommentEntity } from '../comment/comment.entity'
import { ProductEntity } from '../product/entities/product.entity'
import { ShopEntity } from '../shop/shop.entity'
import { UserLocationEntity } from '../user-location/user-location.entity'
import { UserWalletEntity } from '../user-wallet/user-wallet.entity'

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ name: 'first_name' })
  firstName: string

  @Column({ name: 'last_name' })
  lastName: string

  @Column({ name: 'middle_name' })
  middleName: string

  @Column({ type: 'varchar' })
  username: string

  @Column({ type: 'varchar', length: 255, select: false })
  password: string

  @Column({ name: 'is_deleted', default: false, type: 'boolean' })
  isDeleted: boolean

  @Column({ name: 'is_active', default: true })
  isActive: boolean

  @Column({ name: 'email_address', type: 'varchar' })
  emailAddress: string

  @Column({ name: 'is_email_verified', default: false })
  isEmailVerified: boolean

  @Column({ name: 'country_code', type: 'varchar' })
  countryCode: string

  @Column({ name: 'phone_number', type: 'varchar' })
  phoneNumber: string

  @Column({ name: 'is_phone_verified', default: false })
  isPhoneVerified: boolean

  @Column({ name: 'birth_date', type: 'date' })
  birthDate: string

  @Column({ type: 'varchar' })
  photo: string

  @OneToOne(type => UserLocationEntity, location => location.user, { cascade: true })
  location: UserLocationEntity

  @OneToMany(type => ProductEntity, product => product.createdBy)
  products: ProductEntity[]

  @ManyToMany(type => ProductEntity)
  @JoinTable({
    name: 'users_favorite_products',
    joinColumn: { name: 'user_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'product_id', referencedColumnName: 'id' }
  })
  favoriteProducts: ProductEntity[]

  @OneToMany(type => ShopEntity, shop => shop.owner)
  ownedStores: ShopEntity[]

  @OneToOne(type => CartEntity, cart => cart.user)
  cart: CartEntity

  @OneToMany(type => CommentEntity, comment => comment.author)
  comments: CommentEntity[]

  @OneToOne(type => UserWalletEntity, wallet => wallet.user)
  wallet: UserWalletEntity

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
