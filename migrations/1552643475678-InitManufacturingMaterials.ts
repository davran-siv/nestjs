import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class InitManufacturingMaterials1552643475678 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createTable(new Table({
      name: 'manufacturing_materials',
      columns: [
        { name: 'id', type: 'UUID', default: 'uuid_generate_v4()', isPrimary: true, isUnique: true },
        { name: 'material', type: 'VARCHAR', length: '255' },
      ]
    }), true)
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropTable('manufacturing_materials', true)
  }

}
