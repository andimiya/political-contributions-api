/* eslint class-methods-use-this: ["error", { "exceptMethods": ["validate", "defaultMessage"] }] */

import { ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';

@ValidatorConstraint({ name: 'isAcrValue', async: false })
export default class IsAcrValue implements ValidatorConstraintInterface {
  validate(value: string): boolean {
    const lowerValue = value.toLowerCase();
    return lowerValue === 'a1' || lowerValue === 'a3';
  }

  defaultMessage(): string {
    return 'Must be a valid acr_value of: a1 or a3';
  }
}
