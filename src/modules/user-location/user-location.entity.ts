import { Column, Entity, JoinColumn, OneToOne } from 'typeorm'
import { UserEntity } from '../user/user.entity'

@Entity('user_locations')
export class UserLocationEntity {
  @Column()
  country: string

  @Column()
  city: string

  @Column()
  state: string

  @Column({ name: 'zip_code' })
  zipCode: string

  @Column()
  street: string

  @OneToOne(type => UserEntity, user => user.location, { primary: true })
  @JoinColumn({ name: 'user_id' })
  user: UserEntity
}
