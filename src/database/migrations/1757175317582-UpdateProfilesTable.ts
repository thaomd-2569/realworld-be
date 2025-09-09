import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateProfilesTable1757175317582 implements MigrationInterface {
  name = 'UpdateProfilesTable1757175317582';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "profile_follows" ("follower_id" integer NOT NULL, "following_id" integer NOT NULL, CONSTRAINT "PK_c8ef323a0dec8b585607d628a71" PRIMARY KEY ("follower_id", "following_id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_8fa28ab221b7413e9df976adea" ON "profile_follows" ("follower_id") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_6cbe32bd94f7fec329b68ff9a4" ON "profile_follows" ("following_id") `,
    );
    await queryRunner.query(
      `ALTER TABLE "profile_follows" ADD CONSTRAINT "FK_8fa28ab221b7413e9df976adea6" FOREIGN KEY ("follower_id") REFERENCES "profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "profile_follows" ADD CONSTRAINT "FK_6cbe32bd94f7fec329b68ff9a4d" FOREIGN KEY ("following_id") REFERENCES "profiles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "profile_follows" DROP CONSTRAINT "FK_6cbe32bd94f7fec329b68ff9a4d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "profile_follows" DROP CONSTRAINT "FK_8fa28ab221b7413e9df976adea6"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_6cbe32bd94f7fec329b68ff9a4"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_8fa28ab221b7413e9df976adea"`,
    );
    await queryRunner.query(`DROP TABLE "profile_follows"`);
  }
}
