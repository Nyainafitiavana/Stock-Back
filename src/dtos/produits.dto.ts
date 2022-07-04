/* eslint-disable prettier/prettier */
import { IsString, IsNumber, IsObject } from 'class-validator';
import { Category } from '@/interfaces/category.interface';

export class CreateProduitDto {
  @IsString()
  public designation: string;

  @IsNumber()
  public prix: number;

  @IsObject()
  public category: Category;
}
