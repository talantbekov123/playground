import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1713818231194 implements MigrationInterface {
  name = 'Migration1713818231194';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "user" ("id" SERIAL NOT NULL, "username" character varying NOT NULL, "password" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "sleep" ("id" SERIAL NOT NULL, "date" date NOT NULL, "startTime" TIMESTAMP, "endTime" TIMESTAMP, "duration" numeric, "userId" integer, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_f0907ba0f68dd2f42ccd60cc0d8" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "sleep" ADD CONSTRAINT "FK_c9ddc11139363b3d98cc3b05351" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "sleep" DROP CONSTRAINT "FK_c9ddc11139363b3d98cc3b05351"`,
    );
    await queryRunner.query(`DROP TABLE "sleep"`);
    await queryRunner.query(`DROP TABLE "user"`);
  }
}
