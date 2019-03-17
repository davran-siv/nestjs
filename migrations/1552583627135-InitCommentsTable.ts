import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm'

export class InitCommentsTable1552583627135 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createTable(new Table({
      name: 'comments',
      columns: [
        { name: 'id', type: 'UUID', default: 'uuid_generate_v4()', isPrimary: true, isUnique: true },
        { name: 'comment_text', type: 'VARCHAR', length: '1000' },
        { name: 'author_id', type: 'UUID' },
        { name: 'replied_to_comment_id', type: 'UUID', isNullable: true },
        { name: 'created_at', type: 'TIMESTAMP WITH TIME ZONE', default: 'NOW()' },
        { name: 'updated_at', type: 'TIMESTAMP WITH TIME ZONE', isNullable: true }
      ]
    }), true)

    await queryRunner.createForeignKey('comments', new TableForeignKey({
      columnNames: ['author_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'users'
    }))

    await queryRunner.createForeignKey('comments', new TableForeignKey({
      columnNames: ['replied_to_comment_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'comments'
    }))
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropTable('comments', true)
  }

}
