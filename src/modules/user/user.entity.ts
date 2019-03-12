import { Column, Entity, OneToOne, PrimaryGeneratedColumn, OneToMany } from 'typeorm'
import { ProductEntity } from '../product/product.entity'
import { UserLocationEntity } from '../user-location/user-location.entity'

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn()
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

  @Column({ name: 'created_at', type: 'time without time zone' })
  createdAt: Date

  @Column({ name: 'updated_at', type: 'time without time zone' })
  updatedAt: Date

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
}
