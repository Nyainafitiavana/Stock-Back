/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

import { Roles } from '@/interfaces/roles.interface';
import { UserEntity } from './users.entity';

@Entity()
export class RoleEntity extends BaseEntity implements Roles {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  designation: string;

  @OneToMany(() => UserEntity, (user: UserEntity) => user.role)
  public user: UserEntity[];

}
