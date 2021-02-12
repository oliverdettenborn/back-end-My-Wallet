import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm'

export class SessionTable1613137296588 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'sessions',
      columns: [
        {
          name: 'id',
          type: 'int',
          isPrimary: true,
          isGenerated: true,
          generationStrategy: 'increment'
        },
        {
          name: 'userId',
          type: 'int'
        },
        {
          name: 'token',
          type: 'varchar'
        },
        {
          name: 'created_at',
          type: 'timestamp',
          default: 'now()'
        }
      ]
    }), true)

    await queryRunner.createForeignKey('sessions', new TableForeignKey({
      columnNames: ['userId'],
      referencedColumnNames: ['id'],
      referencedTableName: 'users'
    }))
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('sessions')
    const foreignKey = table.foreignKeys.find(fk => fk.columnNames.indexOf('userId') !== -1)
    await queryRunner.dropForeignKey('sessions', foreignKey)
    await queryRunner.dropTable('sessions')
  }
}
