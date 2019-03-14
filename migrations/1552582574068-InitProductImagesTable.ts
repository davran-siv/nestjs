import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm'

export class InitProductImagesTable1552582574068 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createTable(new Table({
      name: 'product_images',
      columns: [
        { name: 'id', type: 'UUID', default: 'uuid_generate_v4()', isPrimary: true, isUnique: true },
        { name: 'url', type: 'VARCHAR' },
        { name: 'created_at', type: 'TIMESTAMP WITH TIME ZONE', default: 'NOW()' },
        { name: 'product_id', type: 'UUID' }
      ]
    }), true)

    await queryRunner.createForeignKey('product_images', new TableForeignKey({
      columnNames: ['product_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'products'
    }))
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
  }

}
