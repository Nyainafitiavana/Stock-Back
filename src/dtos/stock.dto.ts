/* eslint-disable prettier/prettier */
import { IsObject, IsNumber } from 'class-validator';
import { Produit } from '@/interfaces/produits.interface';

export class CreatestockDto {

  @IsNumber()
  public quantite: number;

  @IsObject()
  public produit: Produit;
}
