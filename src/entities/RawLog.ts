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
import IsMccmnc from '../validators/isMccmncValidator';

export enum API {
  authorize = 0,
  token = 1,
  userinfo = 2,
  userinfo2 = 3,
  usertrait = 4,
  create = 5,
  provision = 6
}

export enum FLOW {
  pr = 0,
  se = 1,
  si = 2
}

export enum STATUS {
  success = 0,
  fail = 1
}

@Entity({ name: 'raw_logs' })
export class RawLog {
  constructor() {
    this.validationErrorMessages = [];
  }


  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column({
    type: 'integer',
    enum: API,
    nullable: false,
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

  @Column({
    type: 'integer',
    enum: STATUS,
    nullable: false,
  })
  @IsEnum(STATUS)
  status?: STATUS;

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

  @Column('varchar', { nullable: true })
  @IsString()
  @IsOptional()
  usertrait?: string;

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


  async isValid(): Promise<boolean> {
    const errors = await validate(this);
    if (errors && errors.length > 0) {
      this.validationErrors = errors;

      errors.forEach((err) => {
        if (!err.constraints) return;

        Object.keys(err.constraints).forEach((key) => {
          if (!err?.constraints?.[key]) return;
          this.validationErrorMessages.push(`${err.property}: ${err.constraints[key]}`);
        });
      });

      return false;
    }
    return true;
  }

  apiType(): string {
    if (this.api === undefined) return '';
    return API[this.api.toString()];
  }

  validationErrors;

  validationErrorMessages;
}
