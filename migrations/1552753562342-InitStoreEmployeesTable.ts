import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm'

export class InitStoreEmployeesTable1552753272037 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createTable(new Table({
      name: 'store_employees',
      columns: [
        { name: 'id', type: 'UUID', default: 'uuid_generate_v4()', isUnique: true, isPrimary: true },
        { name: 'user_id', type: 'UUID' },
        { name: 'created_at', type: 'TIMESTAMP WITH TIME ZONE', default: 'NOW()' }
      ]
    }), true)

    await queryRunner.createForeignKey('stores', new TableForeignKey({
      columnNames: ['user_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'users'
    }))
  }


  public async down(queryRunner: QueryRunner): Promise<any> {
    await  queryRunner.dropTable('store_employees', true)
  }

}
