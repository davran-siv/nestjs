import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { UserEntity } from '../user/user.entity'

@Entity('stores')
export class StoreEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ name: 'name_of_store', type: 'varchar', length: 100 })
  nameOfStore: string

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
}
