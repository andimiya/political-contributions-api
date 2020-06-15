/* eslint class-methods-use-this: ["error", { "exceptMethods": ["validate", "defaultMessage"] }] */

import { ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';

const API = [
  'authorize',
  'token',
  'userinfo',
  'userinfo2',
  'usertrait',
  'create',
  'provision',
  'set',
];

@ValidatorConstraint({ name: 'isApi', async: false })
export default class IsApi implements ValidatorConstraintInterface {
  validate(value: string): boolean {
    return API.includes(value.toLowerCase());
  }

  defaultMessage(): string {
    return `Must be a valid API of: ${API.join(', ')}`;
  }
}
