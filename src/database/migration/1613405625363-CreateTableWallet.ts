import { MigrationInterface, QueryRunner } from 'typeorm'

export class CreateTableWallet1613405625363 implements MigrationInterface {
    name = 'CreateTableWallet1613405625363'

    public async up (queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query('CREATE TABLE "wallet" ("id" SERIAL NOT NULL, "description" character varying NOT NULL, "amount" money NOT NULL, "kind" character varying NOT NULL, "insertionDate" TIMESTAMP NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT \'NOW()\', "updatedAt" TIMESTAMP NOT NULL DEFAULT \'NOW()\', "userId" integer, CONSTRAINT "PK_bec464dd8d54c39c54fd32e2334" PRIMARY KEY ("id"))')
      await queryRunner.query('COMMENT ON COLUMN "users"."createdAt" IS NULL')
      await queryRunner.query('ALTER TABLE "users" ALTER COLUMN "createdAt" SET DEFAULT \'NOW()\'')
      await queryRunner.query('COMMENT ON COLUMN "users"."updatedAt" IS NULL')
      await queryRunner.query('ALTER TABLE "users" ALTER COLUMN "updatedAt" SET DEFAULT \'NOW()\'')
      await queryRunner.query('COMMENT ON COLUMN "sessions"."createdAt" IS NULL')
      await queryRunner.query('ALTER TABLE "sessions" ALTER COLUMN "createdAt" SET DEFAULT \'NOW()\'')
      await queryRunner.query('COMMENT ON COLUMN "sessions"."updatedAt" IS NULL')
      await queryRunner.query('ALTER TABLE "sessions" ALTER COLUMN "updatedAt" SET DEFAULT \'NOW()\'')
      await queryRunner.query('ALTER TABLE "wallet" ADD CONSTRAINT "FK_35472b1fe48b6330cd349709564" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION')
    }

    public async down (queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query('ALTER TABLE "wallet" DROP CONSTRAINT "FK_35472b1fe48b6330cd349709564"')
      await queryRunner.query('ALTER TABLE "sessions" ALTER COLUMN "updatedAt" SET DEFAULT \'2021-02-15 13:13:03.205405\'')
      await queryRunner.query('COMMENT ON COLUMN "sessions"."updatedAt" IS NULL')
      await queryRunner.query('ALTER TABLE "sessions" ALTER COLUMN "createdAt" SET DEFAULT \'2021-02-15 13:13:03.205405\'')
      await queryRunner.query('COMMENT ON COLUMN "sessions"."createdAt" IS NULL')
      await queryRunner.query('ALTER TABLE "users" ALTER COLUMN "updatedAt" SET DEFAULT \'2021-02-15 13:13:03.205405\'')
      await queryRunner.query('COMMENT ON COLUMN "users"."updatedAt" IS NULL')
      await queryRunner.query('ALTER TABLE "users" ALTER COLUMN "createdAt" SET DEFAULT \'2021-02-15 13:13:03.205405\'')
      await queryRunner.query('COMMENT ON COLUMN "users"."createdAt" IS NULL')
      await queryRunner.query('DROP TABLE "wallet"')
    }
}
