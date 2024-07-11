import { IsString, IsOptional, IsInt } from 'class-validator';

export class CreatePositionDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsOptional()
  @IsInt()
  parentId?: number;
}
