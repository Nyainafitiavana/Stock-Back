/* eslint-disable prettier/prettier */
import { IsEmail, IsObject, IsString } from 'class-validator';
import { Roles } from '../interfaces/roles.interface';

export class CreateUserDto {
  @IsEmail()
  public email: string;

  @IsString()
  public password: string;

  @IsString()
  public userName: string;

  @IsString()
  public telephone: string;

  @IsString()
  public adresse: string;

  @IsObject()
  public role: Roles;
}

export class CreateLoginDto {
  @IsString()
  public identifiant: string;

  @IsString()
  public password: string;

}

export class CreateUserSignUpDto {
  @IsEmail()
  public email: string;

  @IsString()
  public password: string;

  @IsString()
  public userName: string;

  @IsString()
  public telephone: string;

  @IsString()
  public adresse: string;
}