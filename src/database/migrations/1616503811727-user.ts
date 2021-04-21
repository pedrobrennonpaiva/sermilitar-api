import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class user1616501320749 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'User',
            columns: [
                {
                    name: 'id',
                    type: 'uuid',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'uuid',
                    default: `uuid_generate_v4()`
                },
                {
                    name: 'name',
                    type: 'varchar',
                },
                {
                    name: 'username',
                    type: 'varchar',
                },
                {
                    name: 'birthday',
                    type: 'datetime',
                },
                {
                    name: 'cpf',
                    type: 'varchar',
                },
                {
                    name: 'email',
                    type: 'varchar',
                },
                {
                    name: 'password',
                    type: 'varchar',
                },
                {
                    name: 'numberPhone',
                    type: 'varchar',
                },
            ]
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('User');
    }

}
