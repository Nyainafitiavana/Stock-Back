import { IsString } from 'class-validator';

export class TypeMouvementDto {
  @IsString()
  public designation: string;
}
