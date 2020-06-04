/* eslint-disable import/prefer-default-export */

import {
  Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Index,
} from 'typeorm';
import {
  IsString,
  IsInt,
  Min,
  IsDate,
  IsBoolean,
  IsOptional,
} from 'class-validator';
import { Exclude } from 'class-transformer';

@Entity({ name: 'raw_log_summaries' })
@Index('index_raw_log_summaries_sent_to_gtv_at', { synchronize: false })
export class RawLogSummary {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { nullable: false })
  @IsString()
  carrier: string;

  @Column('varchar', { nullable: false })
  @IsString()
  service: string;

  @Column('integer', { nullable: false })
  @IsInt()
  @Min(0)
  count: string;

  @Column('boolean', { nullable: false })
  @IsBoolean()
  success: boolean;

  @Column('timestamp', { nullable: false })
  @IsDate()
  summarized_at: Date;

  @Column('timestamp', { nullable: true })
  @IsOptional()
  @IsDate()
  sent_to_gtv_at?: Date;

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
