/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

import { Roles } from '@/interfaces/roles.interface';

@Entity()
export class RoleEntity extends BaseEntity implements Roles {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  designation: string;

}
