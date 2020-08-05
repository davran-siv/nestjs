import {Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn} from 'typeorm'

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn({ type: 'uuid' })
  id: string

  @Column({ name: 'first_name' })
  firstName: string

  @Column({ name: 'last_name' })
  lastName: string

  @Column({ type: 'varchar' })
  username: string

  @Column({ select: false })
  password?: string

  @DeleteDateColumn({ name: 'deleted_at', nullable: true })
  deletedAt: boolean | null

  @Column({ name: 'is_active', default: true })
  isActive: boolean

  @CreateDateColumn({ name: 'created_at', nullable: true })
  createdAt: Date

  @UpdateDateColumn({ name: 'updated_at', nullable: true })
  updatedAt: Date | null

  @Column({ name: 'email_address', type: 'varchar' })
  emailAddress: string

  @Column({ name: 'is_email_verified', default: false })
  isEmailVerified: boolean
}
