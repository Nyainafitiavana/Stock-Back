/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';

import { Produit } from '@/interfaces/produits.interface';
import { CategoryEntity } from './category.entity';
import { StockEntity } from './stock.entity';
import { DetailMouvementEntity } from './detailMouvement.entity';
// import { DetailMouvementEntity } from './detailMouvement.entity';
// import { StockEntity } from './stock.entity';
// import { DetailMouvementEntity } from './detailMouvement.entity';

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

  @OneToMany(() => StockEntity, (stock: StockEntity) => stock.produit)
  public stock: StockEntity[];

  @OneToMany(() => DetailMouvementEntity, (detailMouvements :DetailMouvementEntity ) => detailMouvements.produit)
  public detailMouvements: DetailMouvementEntity[];
}
