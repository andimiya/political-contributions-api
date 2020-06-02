import { RawLog, STATUS } from '../../entities/RawLog';

function checkRequiredParams(params: string[], rawLog: RawLog): void {
  params.forEach((param) => {
    // eslint-disable-next-line eqeqeq
    if (rawLog[param] == undefined) {
      const errMsg = `${param} is required and cannot be null`;
      rawLog.validationErrorMessages.push(errMsg);
    }
  });
}

function validateErrorPresence(rawLog: RawLog): void {
  if (rawLog.status === STATUS.success) return;

  // eslint-disable-next-line eqeqeq
  if (rawLog.error == undefined || rawLog.error_description == undefined) {
    const errMsg = 'When "status" param is "fail" both error and error_description must be present';
    rawLog.validationErrorMessages.push(errMsg);
  }
}

export default function sharedApiValidator(requiredParams: string[], rawLog: RawLog): boolean {
  checkRequiredParams(requiredParams, rawLog);
  validateErrorPresence(rawLog);

  return rawLog.validationErrorMessages.length === 0;
}
