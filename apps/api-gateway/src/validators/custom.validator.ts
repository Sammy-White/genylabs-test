import { Injectable } from '@nestjs/common';
import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'nowPlus15mins', async: false })
@Injectable()
export class NowPlus15Mins implements ValidatorConstraintInterface {
  validate(client_phone: string, args?: ValidationArguments): boolean {
    if (!client_phone) return false;
    const date = new Date(client_phone);
    if (isNaN(date.getTime())) return false;
    const now = new Date();
    const adjustedTime = new Date(now.getTime() + 60 * 60 * 1000);
    const nowPlus15 = new Date(adjustedTime.getTime() + 15 * 60 * 1000);
    return date.getTime() >= nowPlus15.getTime();
  }

  defaultMessage(args: ValidationArguments): string {
    return `${args.property} must be at least 15 minutes from now`;
  }
}
