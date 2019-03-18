import { BeforeInsert, BeforeUpdate, Column, Entity, JoinColumn, OneToOne } from 'typeorm'
import { UserEntity } from '../user/user.entity'

@Entity('user_wallets')
export class UserWalletEntity {
  @OneToOne(type => UserEntity, user => user.wallet, { primary: true })
  @JoinColumn({ name: 'user_id' })
  user: UserEntity

  @Column({ name: 'stripe_id', type: 'varchar', length: 64, primary: true, unique: true })
  stripeId: string

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