import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator'
import { isArray } from '../../utils'

@ValidatorConstraint()
export class IsEnumPossibleAsArrayConstraint implements ValidatorConstraintInterface {

  validate(value: Object | Object[], args: ValidationArguments) {
    const valueAsArray = isArray(value) ? value : [value]
    const enumValues = Object.values(args.constraints[0])
    return valueAsArray.every(it => enumValues.indexOf(it) >= 0)
  }

  defaultMessage(args: ValidationArguments): string {
    return `${args.property} must be a valid enum value`
  }

}

export function IsEnumPossibleAsArray(enumObject: Object, validationOptions?: ValidationOptions) {
  return function(object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [enumObject],
      validator: IsEnumPossibleAsArrayConstraint,
    })
  }
}
