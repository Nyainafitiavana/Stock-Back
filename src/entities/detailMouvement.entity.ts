/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn, Double } from 'typeorm';
import { DetailMouvement } from '../interfaces/detailMouvement.interface';
import { MouvementEntity } from './mouvement.entity';
import { ProduitEntity } from './produits.entity';

@Entity()
export class DetailMouvementEntity extends BaseEntity implements DetailMouvement {

  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => MouvementEntity, (mouvement) => mouvement.detailMouvements)
  public mouvement: MouvementEntity;

  @ManyToOne(() => ProduitEntity, (produit : ProduitEntity ) => produit.detailMouvements)
 public produit: ProduitEntity;

  @Column()
  quantite: number;
    
  @Column()
  prixTotal: number;

}
