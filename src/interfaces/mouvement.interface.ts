/* eslint-disable prettier/prettier */
import { User } from './users.interface';
import { TypeMouvement } from './typeMouvement.interface';

/* eslint-disable prettier/prettier */
export interface Mouvement {
    id: number;
    motif: string;
    user?: User;
    createdAt: string;
    typeMouvement?: TypeMouvement;
}
  