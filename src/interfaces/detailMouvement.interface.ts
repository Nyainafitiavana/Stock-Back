/* eslint-disable prettier/prettier */
import { Produit } from '@/interfaces/produits.interface';
import { Double } from 'typeorm';
import { Mouvement } from '@/interfaces/mouvement.interface';

/* eslint-disable prettier/prettier */
export interface DetailMouvement {
    id?: number;
    mouvement?: Mouvement;
    produit?: Produit;
    quantite?: number;
    prixTotal?: Double;
}
  