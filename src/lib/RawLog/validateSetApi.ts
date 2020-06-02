import { RawLog } from '../../entities/RawLog';
import sharedApiValidator from './sharedApiValidator';

const requiredParams = [
  'api',
  'mccmnc',
  'event',
  'timestamp',
  'client_id',
  'correlation_id',
  'status',
  'sub',
];

export default function validateSetApi(rawLog: RawLog): boolean {
  return sharedApiValidator(requiredParams, rawLog);
  // && otherCustomValidations
}
