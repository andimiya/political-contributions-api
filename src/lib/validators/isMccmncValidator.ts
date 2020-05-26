/* eslint class-methods-use-this: ["error", { "exceptMethods": ["validate", "defaultMessage"] }] */

import { ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import mccmncList from '../mccmnc';

@ValidatorConstraint({ name: 'isMccmnc', async: false })
export default class IsMccmnc implements ValidatorConstraintInterface {
  validate(integer: number): boolean {
    return typeof integer === 'number'
           && mccmncList[integer] !== undefined;
  }

  defaultMessage(): string { // here you can provide default error message if validation failed
    return 'Must be a valid MCCMNC number';
  }
}
