/* eslint-disable prettier/prettier */
import { IsString} from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  public designation: string;

}
