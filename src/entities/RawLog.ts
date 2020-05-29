import {
  Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn,
} from 'typeorm';
import {
  IsString,
  IsDate,
  IsOptional,
  IsEnum,
  Validate,
  validate,
} from 'class-validator';
import { Exclude } from 'class-transformer';
import IsMccmnc from '../lib/validators/isMccmncValidator';

export enum API {
  AUTHORIZE = 0,
  TOKEN = 1,
  USERINFO = 2,
  USERINFO2 = 3,
  USERTRAIT = 4,
  CREATE = 5,
  PROVISION = 6
}

export enum FLOW {
  PR = 0,
  SE = 1,
  SI = 2
}

export enum STATUS {
  SUCCESS = 0,
  FAIL = 1
}

@Entity({ name: 'raw_logs' })
export class RawLog {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column({
    type: 'integer',
    enum: API,
  })
  @IsEnum(API)
  api?: API;

  @Column({
    type: 'integer',
    enum: FLOW,
    nullable: true,
  })
  @IsEnum(FLOW)
  @IsOptional()
  flow?: FLOW;

  @Column('integer')
  @Validate(IsMccmnc)
  mccmnc?: number;

  @Column('timestamp')
  @IsDate()
  timestamp?: Date;

  @Column('varchar', { nullable: true })
  @IsString()
  @IsOptional()
  client_id?: string;

  @Column('varchar', { nullable: true })
  @IsString()
  @IsOptional()
  redirect_uri?: string;

  @Column('varchar', { nullable: true })
  @IsString()
  @IsOptional()
  correlation_id?: string;

  @Column({
    type: 'integer',
    enum: STATUS,
  })
  @IsEnum(STATUS)
  status?: STATUS;

  @Column('varchar', { nullable: true })
  @IsString()
  @IsOptional()
  error?: string;

  @Column('text', { nullable: true })
  @IsOptional()
  error_description?: string;

  @Column('text', { nullable: true })
  @IsOptional()
  sub?: string;

  @Column('varchar', { nullable: true })
  @IsString()
  @IsOptional()
  context?: string;

  @Column('varchar', { nullable: true })
  @IsString()
  @IsOptional()
  acr_value?: string;

  @Column('varchar', { nullable: true })
  @IsString()
  @IsOptional()
  sdk_version?: string;

  @Column('varchar', { nullable: true })
  @IsString()
  @IsOptional()
  event?: string;

  @Column('varchar', { nullable: true })
  @IsString()
  @IsOptional()
  scopes?: string;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  @IsDate()
  @Exclude()
  @IsOptional()
  readonly created_at?: Date;

  @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  @IsDate()
  @Exclude()
  @IsOptional()
  readonly updated_at?: Date;

  validationErrors;

  validationErrorMessages;


  async isValid(): Promise<boolean> {
    const errors = await validate(this);
    if (errors && errors.length > 0) {
      this.validationErrors = errors;
      this.validationErrorMessages = [];

      errors.forEach((err) => {
        if (!err.constraints) return;

        Object.keys(err.constraints).forEach((key) => {
          if (!err || !err.constraints || !err.constraints[key]) return; // because TypeScript
          this.validationErrorMessages.push(`${err.property}: ${err.constraints[key]}`);
        });
      });

      return false;
    }
    return true;
  }
}
