/* eslint-disable prettier/prettier */
import { IsString, IsArray } from 'class-validator';
import { DetailMouvement } from '../interfaces/detailMouvement.interface';

export class CreateMouvementDto {
  @IsString()
  public motif: string;

  @IsArray()
  public detailMouvement : DetailMouvement
  
}
