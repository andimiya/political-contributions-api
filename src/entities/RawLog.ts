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
import IsApi from '../validators/isApiValidator'; // eslint-disable-line import/no-cycle
import IsFlow from '../validators/isFlowValidator';
import IsAcrValue from '../validators/isAcrValueValidator';
import validateClass from '../lib/validateClass';

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
  @IsOptional()
  @IsString()
  @Validate(IsAcrValue)
  acr_value?: string;

  @Column('varchar', { nullable: true })
  @IsOptional()
  @IsString()
  sdk_version?: string;

  @Column('varchar', { nullable: true })
  @IsOptional()
  @IsString()
  event?: string;

  @Column('varchar', { nullable: true })
  @IsOptional()
  @IsString()
  scopes?: string;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  @IsOptional()
  @IsDate()
  @Exclude()
  readonly created_at?: Date;

  @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  @IsOptional()
  @IsDate()
  @Exclude()
  readonly updated_at?: Date;


  async isValid(): Promise<boolean> {
    return validateClass(this);
  }

  validationErrors;

  validationErrorMessages;
}
