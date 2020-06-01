import { RawLog } from '../../entities/RawLog';
import sharedApiValidator from './sharedApiValidator';

const requiredParams = [
  'api',
  'mccmnc',
  'scopes',
  'timestamp',
  'client_id',
  'redirect_uri',
  'correlation_id',
  'status',
  'sub',
  'acr_value',
];

export default function validateUsertraitApi(rawLog: RawLog): boolean {
  return sharedApiValidator(requiredParams, rawLog);
  // && otherCustomValidations
}
