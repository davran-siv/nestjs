import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

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

  @Column({ name: 'username' })
  username: string

  @Column({ name: 'password', select: false })
  password: string

  @Column({ name: 'is_deleted', default: false })
  isDeleted: boolean

  @Column({ name: 'is_active', default: true })
  isActive: boolean

  @Column({ name: 'created_at', type: 'time without time zone' })
  createdAt: Date

  @Column({ name: 'updated_at', type: 'time without time zone' })
  updatedAt: Date

  @Column({ name: 'email_address' })
  emailAddress: string

  @Column({ name: 'is_email_verified', default: false })
  isEmailVerified: boolean

  @Column({ name: 'birth_date', type: 'date' })
  birthDate: string
}
