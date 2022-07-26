/* eslint-disable prettier/prettier */
import { Roles } from './roles.interface';

export interface User {
  id: number;
  email?: string;
  password: string;
  userName?: string;
  telephone: string;
  adresse: string;
  role?: Roles;
}

