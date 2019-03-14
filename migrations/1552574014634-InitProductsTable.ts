import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm'

export class InitProductTable1552574014634 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createTable(new Table({
      name: 'products',
      columns: [
        { name: 'id', type: 'UUID', default: 'uuid_generate_v4()', isPrimary: true, isUnique: true },
        { name: 'product_name', type: 'VARCHAR', length: '255' },
        { name: 'title', type: 'VARCHAR', length: '255' },
        { name: 'description', type: 'VARCHAR', length: '255' },
        { name: 'is_in_stock', type: 'BOOLEAN' },
        { name: 'made_of', type: 'TEXT' },
        { name: 'manufacturing_process', type: 'TEXT' },
        { name: 'created_by', type: 'UUID' },
        { name: 'category_id', type: 'UUID' },
        { name: 'created_at', type: 'TIMESTAMP WITH TIME ZONE', default: 'NOW()' },
        { name: 'updated_at', type: 'TIMESTAMP WITH TIME ZONE', isNullable: true }
      ]
    }), true)

    await queryRunner.createForeignKey('products', new TableForeignKey({
      columnNames: ['created_by'],
      referencedColumnNames: ['id'],
      referencedTableName: 'users'
    }))
    await queryRunner.createForeignKey('products', new TableForeignKey({
      columnNames: ['category_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'product_categories'
    }))

  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await  queryRunner.dropTable('products', true)
  }

}
