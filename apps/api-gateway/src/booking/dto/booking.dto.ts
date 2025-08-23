import { IsIn, IsISO8601, IsOptional, Length, Matches } from 'class-validator';
import { IsNowPlus15Mins } from '../../decorators/custom.decorator';
import { Services } from '../../constants/index.constant';

export class CreateBookingDto {
  @Length(2, 80)
  clientName: string;

  @Matches(/^\+[1-9]\d{1,14}$/, {
    message: 'Phone number must be in E.164 format (e.g. +14155552671)',
  })
  @Length(7, 15)
  clientPhone: string;

  @IsIn([...Object.values(Services)])
  service: string;

  @IsNowPlus15Mins()
  @IsISO8601()
  startsAt: string;

  @IsOptional()
  @Length(5, 280)
  notes: string;
}
