/* eslint class-methods-use-this: ["error", { "exceptMethods": ["validate", "defaultMessage"] }] */

import { ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';

const ACR_VALUES = ['pr', 'si', 'se'];

@ValidatorConstraint({ name: 'isAcrValue', async: false })
export default class IsAcrValue implements ValidatorConstraintInterface {
  validate(value: string): boolean {
    return ACR_VALUES.includes(value.toLowerCase());
  }

  defaultMessage(): string {
    return `Must be a valid flow value of: ${ACR_VALUES.join(', ')}`;
  }
}
