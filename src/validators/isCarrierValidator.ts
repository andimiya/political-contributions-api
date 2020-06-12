/* eslint class-methods-use-this: ["error", { "exceptMethods": ["validate", "defaultMessage"] }] */

import { ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';

@ValidatorConstraint({ name: 'isCarrier', async: false })
export default class IsCarrier implements ValidatorConstraintInterface {
  validate(value: string): boolean {
    const lowerValue = value.toLowerCase();
    return lowerValue === 'att'
           || lowerValue === 'tmobile'
           || lowerValue === 'sprint'
           || lowerValue === 'verizon';
  }

  defaultMessage(): string {
    return 'Must be a valid carrier of: att, tmobile, verizon or sprint';
  }
}
