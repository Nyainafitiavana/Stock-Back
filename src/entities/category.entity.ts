/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

import { Category } from '@/interfaces/category.interface';
import { ProduitEntity } from './produits.entity';

@Entity()
export class CategoryEntity extends BaseEntity implements Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  designation: string;

  @OneToMany(() => ProduitEntity, (produit: ProduitEntity) => produit.category)
  public produits: ProduitEntity[];
}
