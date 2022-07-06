/* eslint-disable prettier/prettier */
import { IsString, IsObject, IsArray } from 'class-validator';
import { User } from '@/interfaces/users.interface';
import { TypeMouvement } from '../interfaces/typeMouvement.interface';
import { DetailMouvement } from '../interfaces/detailMouvement.interface';

export class CreateMouvementDto {
  @IsString()
  public motif: string;

  @IsObject()
  public user: User;

  @IsArray()
  public detailMouvement : DetailMouvement

  @IsObject()
  public typeMouvement: TypeMouvement;
  
}
