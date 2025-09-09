import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddSlugColumnIntoUsersTable1757218007893
  implements MigrationInterface
{
  name = 'AddSlugColumnIntoUsersTable1757218007893';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" ADD "slug" character varying`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "slug"`);
  }
}
