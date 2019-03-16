import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class InitStoreEmployeeRolesTable1552753557853 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createTable(new Table({
      name: 'store_employee_roles',
      columns: [
        { name: 'id', type: 'UUID', default: 'uuid_generate_v4()', isPrimary: true, isUnique: true },
        { name: 'role', type: 'VARCHAR', length: '50' }
      ]
    }), true)
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropTable('store_employee_roles', true)
  }

}
