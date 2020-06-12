import {
  Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Index,
} from 'typeorm';
import {
  IsString,
  IsDate,
  IsOptional,
  IsEnum,
  Validate,
} from 'class-validator';
import { Exclude } from 'class-transformer';
import IsMccmnc from '../validators/isMccmncValidator';
import IsApi from '../validators/isApiValidator';
import IsFlow from '../validators/isFlowValidator';
import IsAcrValue from '../validators/isAcrValueValidator';
import validateClass from '../lib/validateClass';

export const API = [
  'authorize',
  'token',
  'userinfo',
  'userinfo2',
  'usertrait',
  'create',
  'provision',
  'set'
]

export enum STATUS {
  success = 0,
  fail = 1
}

@Entity({ name: 'raw_logs' })
@Index('raw_logs_uniqueness_index', { synchronize: false })
export class RawLog {
  constructor() {
    this.validationErrorMessages = [];
  }

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { nullable: false })
  @Validate(IsApi)
  api: string;

  @Column('varchar', { nullable: false })
  @IsOptional()
  @Validate(IsFlow)
  flow: string;

  @Column({
    type: 'integer',
    enum: STATUS,
    nullable: false,
  })
  @IsEnum(STATUS)
  status: STATUS;

  @Column('integer', { nullable: false })
  @Validate(IsMccmnc)
  mccmnc: number;

  @Column('timestamp', { nullable: false })
  @IsDate()
  timestamp: Date;

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
