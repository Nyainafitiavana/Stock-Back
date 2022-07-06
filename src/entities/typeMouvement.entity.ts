/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { TypeMouvement } from '@/interfaces/typeMouvement.interface';
import { MouvementEntity } from './mouvement.entity';

@Entity()
export class TypeMouvementEntity extends BaseEntity implements TypeMouvement {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  designation: string;

  @OneToMany(() => MouvementEntity, (mouvement) => mouvement.typeMouvement)
  public mouvements: MouvementEntity[];

}
