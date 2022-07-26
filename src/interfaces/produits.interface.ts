/* eslint-disable prettier/prettier */
import { Category } from '@/interfaces/category.interface';

/* eslint-disable prettier/prettier */
export interface Produit {
    id: number;
    designation: string;
    prix: number;
    category?: Category;
}
  