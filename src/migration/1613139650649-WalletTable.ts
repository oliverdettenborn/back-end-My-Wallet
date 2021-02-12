import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm'

export class WalletTable1613139650649 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'wallet',
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
          name: 'description',
          type: 'varchar'
        },
        {
          name: 'kind',
          type: 'varchar'
        },
        {
          name: 'amount',
          type: 'money'
        },
        {
          name: 'insertionDate',
          type: 'timestamp'
        },
        {
          name: 'created_at',
          type: 'timestamp',
          default: 'now()'
        }
      ]
    }), true)

    await queryRunner.createForeignKey('wallet', new TableForeignKey({
      columnNames: ['userId'],
      referencedColumnNames: ['id'],
      referencedTableName: 'users'
    }))
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('wallet')
    const foreignKey = table.foreignKeys.find(fk => fk.columnNames.indexOf('userId') !== -1)
    await queryRunner.dropForeignKey('wallet', foreignKey)
    await queryRunner.dropTable('wallet')
  }
}
