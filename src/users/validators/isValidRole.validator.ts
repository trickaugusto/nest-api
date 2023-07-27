import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'IsValidRole' })
export class isValidRole implements ValidatorConstraintInterface {
  validate(value: number) {
    return [1, 2, 3].includes(value);
  }
}
