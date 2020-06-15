/* eslint-disable import/prefer-default-export */

import {
  Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Index,
} from 'typeorm';
import {
  IsString,
  IsInt,
  Min,
  IsDate,
  IsOptional,
  Validate,
} from 'class-validator';
import { Exclude } from 'class-transformer';
import validateClass from '../lib/validateClass';
import IsMccmnc from '../validators/isMccmncValidator';
import IsApi from '../validators/isApiValidator';
import IsFlow from '../validators/isFlowValidator';
import IsAcrValue from '../validators/isAcrValueValidator';

@Entity({ name: 'raw_log_summaries' })
@Index('index_raw_log_summaries_summarized_at', { synchronize: false })
export class RawLogSummary {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { nullable: false })
  @IsString()
  carrier: string;

  @Column('integer', { nullable: false })
  @Validate(IsMccmnc)
  mccmnc: number;

  @Column('varchar', { nullable: false })
  @Validate(IsApi)
  api: string;

  @Column('varchar', { nullable: true })
  @IsOptional()
  @Validate(IsFlow)
  flow: string;

  @Column('varchar', { nullable: false })
  @IsString()
  client_id: string;

  @Column('varchar', { nullable: true })
  @IsOptional()
  @IsString()
  error?: string;

  @Column('varchar', { nullable: true })
  @IsOptional()
  @IsString()
  error_description?: string;

  @Column('varchar', { nullable: true })
  @IsOptional()
  @Validate(IsAcrValue)
  acr_value: string;

  @Column('varchar', { nullable: true })
  @IsOptional()
  @IsString()
  sdk_version?: string;

  @Column('timestamp', { nullable: false })
  @IsDate()
  summarized_at: Date;

  @Column('integer', { nullable: false })
  @IsInt()
  @Min(0)
  count: string;

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
    return validateClass(this);
  }

  validationErrors;

  validationErrorMessages;
}
