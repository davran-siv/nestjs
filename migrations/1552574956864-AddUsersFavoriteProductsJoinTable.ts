import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm'

export class AddUsersFavoriteProductsJoinTable1552574956864 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createTable(new Table({
      name: 'users_favorite_products',
      columns: [
        { name: 'user_id', type: 'UUID' },
        { name: 'product_id', type: 'UUID' }
      ]
    }), true)

    await queryRunner.createForeignKey('users_favorite_products', new TableForeignKey({
      columnNames: ['user_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'users'
    }))
    await queryRunner.createForeignKey('users_favorite_products', new TableForeignKey({
      columnNames: ['product_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'products'
    }))
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropTable('users_favorite_products', true)
  }

}
