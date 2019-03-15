import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm'

export class InitProductReviewsTable1552647620450 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createTable(new Table({
      name: 'product_reviews',
      columns: [
        { name: 'id', type: 'UUID', default: 'uuid_generate_v4()', isPrimary: true, isUnique: true },
        { name: 'mark', type: 'SMALLINT' },
        { name: 'author_id', type: 'UUID' },
        { name: 'product_id', type: 'UUID' },
        { name: 'comment_id', type: 'UUID' },
        { name: 'after_usage_comment_id', type: 'UUID' },
        { name: 'created_at', type: 'TIMESTAMP WITH TIME ZONE', default: 'NOW()' },
        { name: 'updated_at', type: 'TIMESTAMP WITH TIME ZONE', isNullable: true }
      ]
    }), true)

    await queryRunner.createForeignKey('product_reviews', new TableForeignKey({
      columnNames: ['author_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'users'
    }))

    await queryRunner.createForeignKey('product_reviews', new TableForeignKey({
      columnNames: ['product_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'products'
    }))

    await queryRunner.createForeignKey('product_reviews', new TableForeignKey({
      columnNames: ['comment_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'comments'
    }))

    await queryRunner.createForeignKey('product_reviews', new TableForeignKey({
      columnNames: ['after_usage_comment_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'comments'
    }))
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropTable('product_reviews', true)
  }

}
