import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1755922814946 implements MigrationInterface {
    name = 'Init1755922814946'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."booking_service_enum" AS ENUM('MANICURE', 'PEDICURE', 'HAIRCUT')`);
        await queryRunner.query(`CREATE TABLE "booking" ("id" SERIAL NOT NULL, "clientName" character varying(80) NOT NULL, "clientPhone" character varying(15) NOT NULL, "service" "public"."booking_service_enum" NOT NULL, "startsAt" TIMESTAMP NOT NULL, "notes" character varying(280), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_49171efc69702ed84c812f33540" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."user_role_enum" AS ENUM('admin', 'provider')`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "role" "public"."user_role_enum" NOT NULL DEFAULT 'admin', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TYPE "public"."user_role_enum"`);
        await queryRunner.query(`DROP TABLE "booking"`);
        await queryRunner.query(`DROP TYPE "public"."booking_service_enum"`);
    }

}
