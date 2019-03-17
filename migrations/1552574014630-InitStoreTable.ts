import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm'

export class InitStoreTable1552574014630 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createTable(new Table({
      name: 'stores',
      columns: [
        { name: 'id', type: 'UUID', default: 'uuid_generate_v4()', isPrimary: true, isUnique: true },
        { name: 'name_of_store', type: 'VARCHAR', length: '100' },
        { name: 'logo', type: 'TEXT' },
        { name: 'motto', type: 'VARCHAR', isNullable: true },
        { name: 'official_email', type: 'VARCHAR', length: '50' },
        { name: 'created_by', type: 'UUID' },
        { name: 'owner_id', type: 'UUID' }
      ]
    }), true)

    await queryRunner.createForeignKey('stores', new TableForeignKey({
      columnNames: ['created_by'],
      referencedColumnNames: ['id'],
      referencedTableName: 'users'
    }))

    await queryRunner.createForeignKey('stores', new TableForeignKey({
      columnNames: ['owner_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'users'
    }))
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropTable('stores', true)
  }

}
