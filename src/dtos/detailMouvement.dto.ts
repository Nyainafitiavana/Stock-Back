/* eslint-disable prettier/prettier */
import {  IsNumber, IsObject } from 'class-validator';
import { Mouvement } from '@/interfaces/mouvement.interface';
import { Produit } from '@/interfaces/produits.interface';

export class CreateDetailMouvementDto {

  @IsObject()
  public mouvement: Mouvement;

  @IsObject()
  public produit: Produit;

  @IsNumber()
  public quantite: number;

  @IsNumber()
  public prixTotal: number;
}
