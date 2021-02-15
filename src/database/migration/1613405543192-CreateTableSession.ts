import { MigrationInterface, QueryRunner } from 'typeorm'

export class CreateTableSession1613405543192 implements MigrationInterface {
    name = 'CreateTableSession1613405543192'

    public async up (queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query('CREATE TABLE "sessions" ("id" SERIAL NOT NULL, "token" uuid NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT \'NOW()\', "updatedAt" TIMESTAMP NOT NULL DEFAULT \'NOW()\', "userId" integer, CONSTRAINT "REL_57de40bc620f456c7311aa3a1e" UNIQUE ("userId"), CONSTRAINT "PK_3238ef96f18b355b671619111bc" PRIMARY KEY ("id"))')
      await queryRunner.query('COMMENT ON COLUMN "users"."createdAt" IS NULL')
      await queryRunner.query('ALTER TABLE "users" ALTER COLUMN "createdAt" SET DEFAULT \'NOW()\'')
      await queryRunner.query('COMMENT ON COLUMN "users"."updatedAt" IS NULL')
      await queryRunner.query('ALTER TABLE "users" ALTER COLUMN "updatedAt" SET DEFAULT \'NOW()\'')
      await queryRunner.query('ALTER TABLE "sessions" ADD CONSTRAINT "FK_57de40bc620f456c7311aa3a1e6" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION')
    }

    public async down (queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query('ALTER TABLE "sessions" DROP CONSTRAINT "FK_57de40bc620f456c7311aa3a1e6"')
      await queryRunner.query('ALTER TABLE "users" ALTER COLUMN "updatedAt" SET DEFAULT \'2021-02-15 13:12:14.153606\'')
      await queryRunner.query('COMMENT ON COLUMN "users"."updatedAt" IS NULL')
      await queryRunner.query('ALTER TABLE "users" ALTER COLUMN "createdAt" SET DEFAULT \'2021-02-15 13:12:14.153606\'')
      await queryRunner.query('COMMENT ON COLUMN "users"."createdAt" IS NULL')
      await queryRunner.query('DROP TABLE "sessions"')
    }
}
