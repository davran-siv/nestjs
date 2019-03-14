import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm'

export class InitProductCategoryTable1552549575902 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createTable(new Table({
      name: 'product_categories',
      columns: [
        { name: 'id', type: 'UUID', default: 'uuid_generate_v4()', isPrimary: true, isUnique: true },
        { name: 'category_name', type: 'VARCHAR', length: '100' },
        { name: 'is_active', type: 'BOOLEAN', default: true },
        { name: 'parent_category_id', type: 'UUID', isNullable: true }
      ]
    }), true)

    await queryRunner.createForeignKey('product_categories', new TableForeignKey({
      columnNames: ['parent_category_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'product_categories',
      onDelete: 'CASCADE'
    }))
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropTable('product_categories', true)
  }

}
