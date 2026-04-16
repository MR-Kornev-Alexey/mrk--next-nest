import {
  IsOptional,
  IsString,
  IsEmail,
  IsBoolean,
  IsArray,
  IsIn,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

class ChildDto {
  @IsString()
  name: string;

  @IsString()
  age: string;
}

export class SubmitFormDto {
  @IsBoolean()
  consent: boolean;

  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  emailConfirm: string;

  @IsString()
  messenger: string;

  @IsString()
  messengerAccount: string;

  @IsIn(['morning', 'day', 'evening'])
  contactTime_1: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ChildDto)
  children_2: ChildDto[];

  @IsArray()
  caregivers_3_1: string[];

  @IsString()
  @IsOptional()
  caregiversOther_3_2: string;

  @IsString()
  @IsOptional()
  reactionToNo_4: string;

  @IsIn(['me', 'child', 'nanny', 'noRules'])
  @IsOptional()
  lastWord_5: string;

  @IsString()
  @IsOptional()
  previousExperienceText_6: string;

  @IsArray()
  parentalFears_7: string[];

  @IsString()
  @IsOptional()
  parentalFearsOther_7: string;

  @IsArray()
  characterTraits_8: string[];

  @IsString()
  @IsOptional()
  characterTraitsOther_8: string;

  @IsIn(['up_to_50k', '100k_250k', '250k_500k', 'over_500k'])
  budget_9: string;

  @IsIn(['ready_to_change', 'only_child'])
  readiness_10: string;

  @IsIn(['yes', 'no'])
  dailyConnection_11: string;

  @IsString()
  @IsOptional()
  expectedChanges_12: string;

  @IsString()
  @IsOptional()
  internalStateChange_13: string;

  @IsString()
  @IsOptional()
  finalNotes_14: string;
}