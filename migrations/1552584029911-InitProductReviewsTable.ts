import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm'

export class InitProductFeedbackTable1552583242175 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createTable(new Table({
      name: 'product_reviews',
      columns: [
        { name: 'id', type: 'UUID', default: 'uuid_generate_v4()', isPrimary: true, isUnique: true },
        { name: 'mark', type: 'SMALLINT' },
        { name: 'product_id', type: 'UUID' },
        { name: 'created_at', type: 'TIMESTAMP WITH TIME ZONE', default: 'NOW()' },
        { name: 'updated_at', type: 'TIMESTAMP WITH TIME ZONE', isNullable: true }
      ]
    }), true)

    await queryRunner.createForeignKey('product_reviews', new TableForeignKey({
      columnNames: ['product_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'products'
    }))
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropTable('product_reviews', true)
  }

}
