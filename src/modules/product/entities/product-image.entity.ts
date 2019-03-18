import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('product_images')
export class ProductImageEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ type: 'varchar' })
  url: string

  @Column({ name: 'created_at', type: 'time with time zone', readonly: true })
  createdAt: Date

  @BeforeInsert()
  setCreatedAtDate() {
    this.createdAt = new Date()
  }
}
