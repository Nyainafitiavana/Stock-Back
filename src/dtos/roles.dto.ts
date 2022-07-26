/* eslint-disable prettier/prettier */
import { IsString} from 'class-validator';

export class CreateRolesDto {
  @IsString()
  public designation: string;

}
