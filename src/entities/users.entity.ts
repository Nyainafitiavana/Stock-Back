/* eslint-disable prettier/prettier */
import { IsNotEmpty } from 'class-validator';
import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, Unique, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import { User } from '@interfaces/users.interface';
import { RoleEntity } from './roles.entity';

@Entity()
export class UserEntity extends BaseEntity implements User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNotEmpty()
  @Unique(['email'])
  email: string;

  @Column()
  @IsNotEmpty()
  password: string;

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;

  @Column()
  userName: string;

  @Column()
  telephone: string;

  @Column()
  adresse: string;

  @ManyToOne(() => RoleEntity, (role: RoleEntity) => role.user)
  public role: RoleEntity;
}
