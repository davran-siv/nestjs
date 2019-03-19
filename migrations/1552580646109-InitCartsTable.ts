import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm'

export class InitCartTable1552580646109 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createTable(new Table({
      name: 'carts',
      columns: [
        { name: 'id', type: 'UUID', default: 'uuid_generate_v4()', isPrimary: true, isUnique: true },
        { name: 'user_id', type: 'UUID', isPrimary: true, isUnique: true }
      ]
    }), true)

    await queryRunner.createForeignKey('carts', new TableForeignKey({
      columnNames: ['user_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'users'
    }))
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropTable('carts', true)
  }

}
