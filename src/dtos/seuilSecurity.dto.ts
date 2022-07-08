/* eslint-disable prettier/prettier */
import { IsNumber} from 'class-validator';

export class CreateSeuilSecurityDto {
  @IsNumber()
  public seuil: number;

}