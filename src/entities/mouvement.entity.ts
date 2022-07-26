/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn } from 'typeorm';
import { Mouvement } from '../interfaces/mouvement.interface';
import { DetailMouvementEntity } from './detailMouvement.entity';
import { TypeMouvementEntity } from './typeMouvement.entity';
import { UserEntity } from './users.entity';
// import { TypeMouvementEntity } from './typeMouvement.entity';
// import { DetailMouvementEntity } from './detailMouvement.entity';

@Entity()
export class MouvementEntity extends BaseEntity implements Mouvement {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  motif: string;

  @Column()
  createdAt: string;

  @ManyToOne(() => UserEntity, (user: UserEntity) => user.mouvement)
  public user: UserEntity;

  @ManyToOne(() => TypeMouvementEntity, (typeMouvement) => typeMouvement.mouvements)
  public typeMouvement: TypeMouvementEntity;

  @OneToMany(() => DetailMouvementEntity, (detailMouvement) => detailMouvement.mouvement)
  public detailMouvements: DetailMouvementEntity[];

}
