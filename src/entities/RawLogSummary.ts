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
} from 'class-validator';
import { Exclude } from 'class-transformer';
import IsMccmnc from '../validators/isMccmncValidator';

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
  @IsString()
  service: string;

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

  @Column('varchar', { nullable: false })
  @IsString()
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
}
