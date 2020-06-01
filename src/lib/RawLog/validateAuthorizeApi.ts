import { RawLog, STATUS } from '../../entities/RawLog';

const requiredParams = [
  'api',
  'flow',
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

function checkRequiredParams(rawLog: RawLog): any {
  requiredParams.forEach((param) => {
    // eslint-disable-next-line eqeqeq
    if (rawLog[param] == undefined) {
      const errMsg = `${param} is required and cannot be null`;
      rawLog.validationErrorMessages.push(errMsg);
    }
  });
}

function validateErrorPresence(rawLog: RawLog): any {
  if (rawLog.status === STATUS.success) return;

  // eslint-disable-next-line eqeqeq
  if (rawLog.error == undefined || rawLog.error_description == undefined) {
    const errMsg = 'When "status" param is "fail" both error and error_description must be present';
    rawLog.validationErrorMessages.push(errMsg);
  }
}

export default function validateAuthorizeApi(rawLog: RawLog): boolean {
  checkRequiredParams(rawLog);
  validateErrorPresence(rawLog);

  return rawLog.validationErrorMessages.length === 0;
}
