// import { MigrationInterface, QueryRunner, TableIndex } from 'typeorm';
//
// export class CreateBtreeIndexForTableUsers1733048479999
//   implements MigrationInterface
// {
//   public async up(queryRunner: QueryRunner): Promise<void> {
//     await queryRunner.createIndex(
//       'users',
//       new TableIndex({
//         name: 'IDX_USERS_HAS_ISSUES',
//         columnNames: ['hasIssues'],
//       }),
//     );
//   }
//
//   public async down(queryRunner: QueryRunner): Promise<void> {
//     await queryRunner.dropIndex('users', 'IDX_USERS_HAS_ISSUES');
//   }
// }
