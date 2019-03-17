import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm'

export class InitCartItemsTable1552581485949 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createTable(new Table({
      name: 'cart_items',
      columns: [
        { name: 'id', type: 'UUID', default: 'uuid_generate_v4()', isPrimary: true, isUnique: true },
        { name: 'amount', type: 'INTEGER', default: 1 },
        { name: 'price_per_unit', type: 'INTEGER' },
        { name: 'cart_id', type: 'UUID' },
        { name: 'product_id', type: 'UUID' },
        { name: 'created_at', type: 'TIMESTAMP WITH TIME ZONE', default: 'NOW()' },
        { name: 'updated_at', type: 'TIMESTAMP WITH TIME ZONE', isNullable: true }
      ]
    }), true)

    await queryRunner.createForeignKey('cart_items', new TableForeignKey({
      columnNames: ['cart_id'],
      referencedColumnNames: ['user_id'],
      referencedTableName: 'carts'
    }))


    await queryRunner.createForeignKey('cart_items', new TableForeignKey({
      columnNames: ['product_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'products'
    }))
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await  queryRunner.dropTable('cart_items', true)
  }

}
