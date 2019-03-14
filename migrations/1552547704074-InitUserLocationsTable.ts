import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm'

export class InitUserLocationTable1552547704074 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createTable(new Table({
      name: 'user_locations',
      columns: [
        { name: 'user_id', type: 'UUID', isPrimary: true },
        { name: 'country', type: 'VARCHAR', length: '50' },
        { name: 'city', type: 'VARCHAR', length: '50' },
        { name: 'state', type: 'VARCHAR', length: '50' },
        { name: 'zip_code', type: 'INTEGER' },
        { name: 'street', type: 'VARCHAR', length: '255' },
        { name: 'created_at', type: 'TIMESTAMP WITH TIME ZONE', default: 'NOW()' },
        { name: 'updated_at', type: 'TIMESTAMP WITH TIME ZONE', isNullable: true }
      ]
    }), true)

    await queryRunner.createForeignKey('user_locations', new TableForeignKey({
      columnNames: ['user_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'users',
      onDelete: 'CASCADE'
    }))
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropTable('user_locations', true)
  }

}
