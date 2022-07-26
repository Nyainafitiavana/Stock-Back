/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

import { Stock } from '@/interfaces/stock.interface';
import { ProduitEntity } from './produits.entity';

@Entity()
export class StockEntity extends BaseEntity implements Stock {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  quantite: number;

  @ManyToOne(() => ProduitEntity, (produit: ProduitEntity) => produit.stock)
  public produit: ProduitEntity;
}
