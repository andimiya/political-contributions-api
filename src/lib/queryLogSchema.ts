/* eslint-disable import/prefer-default-export */

import {
  IsOptional, IsString, IsDateString, Validate, ValidateIf,
} from 'class-validator';
import IsMccmnc from '../validators/isMccmncValidator';
import IsApi from '../validators/isApiValidator';
import IsCarrier from '../validators/isCarrierValidator';
import IsAcrValue from '../validators/isAcrValueValidator';
import IsFlow from '../validators/isFlowValidator';
import IsSuccess from '../validators/isSuccessValidator';
import validateClass from './validateClass';

export class QueryLogSchema {
  constructor() {
    this.validationErrorMessages = [];
  }

  @IsOptional()
  @Validate(IsCarrier)
  carrier?: string;

  @IsOptional()
  @Validate(IsMccmnc)
  mccmnc?: number;

  @IsOptional()
  @Validate(IsApi)
  api?: string;

  @IsOptional()
  @Validate(IsFlow)
  flow?: string;

  @IsString({
    message: 'is required',
  })
  client_id: string;

  @IsOptional()
  @Validate(IsSuccess)
  success?: string;

  @IsOptional()
  @IsString()
  error?: string;

  @IsOptional()
  @IsString()
  error_description?: string;

  @IsOptional()
  @IsString()
  sdk_version?: string;

  @IsOptional()
  @Validate(IsAcrValue)
  acr_value?: string;

  @IsDateString()
  @IsOptional()
  @ValidateIf((o) => o.ends_at != null)
  starts_at?: string;

  @IsDateString()
  @IsOptional()
  @ValidateIf((o) => o.starts_at != null)
  ends_at?: string;

  async isValid(): Promise<boolean> {
    return validateClass(this);
  }

  validationErrors;

  validationErrorMessages;
}
