/* eslint class-methods-use-this: ["error", { "exceptMethods": ["validate", "defaultMessage"] }] */

import { ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';

@ValidatorConstraint({ name: 'isSuccess', async: false })
export default class IsSuccess implements ValidatorConstraintInterface {
  validate(value: string): boolean {
    const lowerValue = value.toLowerCase();
    return lowerValue === 'true' || lowerValue === 'false';
  }

  defaultMessage(): string {
    return 'Must be true or false';
  }
}
