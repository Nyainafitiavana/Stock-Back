/* eslint-disable prettier/prettier */
import { IsString, IsNumber } from 'class-validator';

export class CreateProduitDto {
  @IsString()
  public designation: string;

  @IsNumber()
  public prix: number;
}
