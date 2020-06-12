/* eslint class-methods-use-this: ["error", { "exceptMethods": ["validate", "defaultMessage"] }] */

import { ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';

@ValidatorConstraint({ name: 'isAcrValue', async: false })
export default class IsAcrValue implements ValidatorConstraintInterface {
  validate(value: string): boolean {
    const lowerValue = value.toLowerCase();
    return lowerValue === 'pr' || lowerValue === 'si' || lowerValue === 'se';
  }

  defaultMessage(): string {
    return 'Must be a valid flow value of: pr, si or se';
  }
}
