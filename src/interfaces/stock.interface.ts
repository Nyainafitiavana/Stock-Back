/* eslint-disable prettier/prettier */
import { Produit } from '@/interfaces/produits.interface';

/* eslint-disable prettier/prettier */
export interface Stock {
    id?: number;
    quantite: number;
    produit?: Produit;
}
  