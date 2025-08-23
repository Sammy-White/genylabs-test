import { registerDecorator, ValidationOptions } from 'class-validator';
import { NowPlus15Mins } from '../validators/custom.validator';

export function IsNowPlus15Mins(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [],
      validator: NowPlus15Mins,
    });
  };
}
