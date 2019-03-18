import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('manufacturing_materials')
export class ManufacturingMaterialEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ type: 'varchar', length: 255 })
  material: string
}