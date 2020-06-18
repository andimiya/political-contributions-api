import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from "typeorm";
import { IsString, IsDate, IsOptional, IsNumber } from "class-validator";
import { Exclude } from "class-transformer";

@Entity({ name: "ca_contributions" })
@Index("ca_contributions_uniqueness_index", { synchronize: false })
export class CAContributions {
  constructor() {
    this.validationErrorMessages = [];
  }

  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("varchar")
  @IsString()
  payee: string;

  @Column("varchar")
  @IsNumber()
  amount_paid: number;

  @Column("timestamp", { nullable: true })
  @IsOptional()
  @IsDate()
  date_paid: Date;

  @Column("varchar")
  @IsString()
  contributor: string;

  @Column("timestamp")
  @IsDate()
  period_start: Date;

  @Column("timestamp")
  @IsDate()
  period_end: Date;

  @Column("varchar")
  @IsString()
  recipient_city: string;

  @Column("varchar")
  @IsString()
  recipient_state: string;

  @CreateDateColumn({ type: "timestamptz", default: () => "CURRENT_TIMESTAMP" })
  @IsOptional()
  @IsDate()
  @Exclude()
  readonly created_at?: Date;

  @UpdateDateColumn({ type: "timestamptz", default: () => "CURRENT_TIMESTAMP" })
  @IsOptional()
  @IsDate()
  @Exclude()
  readonly updated_at?: Date;

  validationErrors;

  validationErrorMessages;
}
