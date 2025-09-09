import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateCommentsTable1757405637954 implements MigrationInterface {
  name = 'UpdateCommentsTable1757405637954';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "comments" ADD "article_id" integer NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "comments" ADD CONSTRAINT "FK_e9b498cca509147e73808f9e593" FOREIGN KEY ("article_id") REFERENCES "articles"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "comments" DROP CONSTRAINT "FK_e9b498cca509147e73808f9e593"`,
    );
    await queryRunner.query(`ALTER TABLE "comments" DROP COLUMN "article_id"`);
  }
}
