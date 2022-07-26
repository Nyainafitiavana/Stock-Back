/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { BaseEntity, Entity, PrimaryGeneratedColumn, Column} from 'typeorm';
import { seuilSecurity } from '../interfaces/seuilSecurity.interface';

@Entity()
export class SeuilSecurityEntity extends BaseEntity implements seuilSecurity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  seuil: number;
}
