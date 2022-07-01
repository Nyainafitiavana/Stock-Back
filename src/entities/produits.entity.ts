/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, Double } from 'typeorm';

import { Produit } from '@/interfaces/produits.interface';

@Entity()
export class ProduitEntity extends BaseEntity implements Produit {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  designation: string;

  @Column()
  prix: number;
}
