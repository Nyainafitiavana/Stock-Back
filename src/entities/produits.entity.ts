/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, Double, ManyToOne } from 'typeorm';

import { Produit } from '@/interfaces/produits.interface';
import { CategoryEntity } from './category.entity';

@Entity()
export class ProduitEntity extends BaseEntity implements Produit {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  designation: string;

  @Column()
  prix: number;

  @ManyToOne(() => CategoryEntity, (category: CategoryEntity) => category.produits)
  public category: CategoryEntity;
}
