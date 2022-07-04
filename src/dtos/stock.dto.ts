/* eslint-disable prettier/prettier */
import { IsString, IsObject, IsNumber } from 'class-validator';
import { Produit } from '@/interfaces/produits.interface';

export class CreateProduitDto {
  @IsString()
  public designation: string;

  @IsNumber()
  public quantite: number;

  @IsObject()
  public produit: Produit;
}
