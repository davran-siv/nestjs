import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm'

export class InitUserWalletTable1552648606600 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createTable(new Table({
      name: 'user_wallets',
      columns: [
        { name: 'user_id', type: 'UUID', isPrimary: true },
        { name: 'stripe_id', type: 'VARCHAR', length: '64', isUnique: true, isPrimary: true },
        { name: 'created_at', type: 'TIMESTAMP WITH TIME ZONE', default: 'NOW()' },
        { name: 'updated_at', type: 'TIMESTAMP WITH TIME ZONE', isNullable: true }
      ]
    }), true)

    await queryRunner.createForeignKey('user_wallets', new TableForeignKey({
      columnNames: ['user_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'users',
      onDelete: 'CASCADE'
    }))
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropTable('user_wallets', false)
  }

}
