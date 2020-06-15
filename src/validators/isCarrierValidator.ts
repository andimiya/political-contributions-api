/* eslint class-methods-use-this: ["error", { "exceptMethods": ["validate", "defaultMessage"] }] */

import { ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';

const CARRIERS = ['att', 'tmobile', 'sprint', 'verizon'];

@ValidatorConstraint({ name: 'isCarrier', async: false })
export default class IsCarrier implements ValidatorConstraintInterface {
  validate(value: string): boolean {
    return CARRIERS.includes(value.toLowerCase());
  }

  defaultMessage(): string {
    return `Must be a valid carrier of: ${CARRIERS.join(', ')}`;
  }
}
