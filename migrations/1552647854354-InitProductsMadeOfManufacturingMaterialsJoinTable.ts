import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm'

export class InitProductsMadeOfManufacturingMaterialsJoinTable1552647854354 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createTable(new Table({
      name: 'products_made_of_manufacturing_materials',
      columns: [
        { name: 'product_id', type: 'UUID' },
        { name: 'manufacturing_material_id', type: 'UUID' }
      ]
    }), true)

    await queryRunner.createForeignKey('products_made_of_manufacturing_materials', new TableForeignKey({
      columnNames: ['product_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'products'
    }))

    await queryRunner.createForeignKey('products_made_of_manufacturing_materials', new TableForeignKey({
      columnNames: ['manufacturing_material_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'manufacturing_materials'
    }))
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropTable('products_made_of_manufacturing_materials', true)
  }


}
