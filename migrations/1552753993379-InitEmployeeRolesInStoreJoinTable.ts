import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm'

export class InitEmployeeRolesInStoreJoinTable1552753993379 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createTable(new Table({
      name: 'employee_roles_in_store',
      columns: [
        { name: 'store_employee_id', type: 'UUID', isPrimary: true },
        { name: 'store_employee_role_id', type: 'UUID', isPrimary: true }
      ]
    }), true)

    await queryRunner.createForeignKey('employee_roles_in_store', new TableForeignKey({
      columnNames: ['store_employee_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'store_employees'
    }))
    await queryRunner.createForeignKey('employee_roles_in_store', new TableForeignKey({
      columnNames: ['store_employee_role_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'store_employee_roles'
    }))
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropTable('employee_roles_in_store', true)
  }

}
