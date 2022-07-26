/* eslint-disable prettier/prettier */
import { NextFunction, Request, Response } from 'express';
import { CreateUserDto, CreateLoginDto } from '@dtos/users.dto';
import { RequestWithUser } from '@interfaces/auth.interface';
import { User } from '@interfaces/users.interface';
import AuthService from '@services/auth.service';
import { CreateUserSignUpDto } from '../dtos/users.dto';
import { Roles } from '../interfaces/roles.interface';
import RolesService from '@/services/roles.service';
import { RoleEntity } from '../entities/roles.entity';

class AuthController {
  public authService = new AuthService();
  public roleService = new RolesService();

  public signUp = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const findRole: Roles = await RoleEntity.findOne({where: { designation: 'CLIENT' }});
      const objectUser: any = {
        email: req.body.email,
        password: req.body.password,
        userName: req.body.userName,
        telephone: req.body.telephone,
        adresse: req.body.adresse,
        role: findRole
      }

      const userData: CreateUserSignUpDto = objectUser;
      console.log(userData);
      
      const signUpUserData: User = await this.authService.signup(userData);

      res.status(201).json({ data: signUpUserData, message: 'signup' });
    } catch (error) {
      next(error);
    }
  };

  public logIn = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userData: CreateLoginDto = req.body;
      const { cookie, findUser } = await this.authService.login(userData);

      res.setHeader('Set-Cookie', [cookie]);
      res.status(200).json({ data: findUser, message: 'login' });
    } catch (error) {
      next(error);
    }
  };

  public logOut = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userData: User = req.user;
      const logOutUserData: User = await this.authService.logout(userData);

      res.setHeader('Set-Cookie', ['Authorization=; Max-age=0']);
      res.status(200).json({ data: logOutUserData, message: 'logout' });
    } catch (error) {
      next(error);
    }
  };
}

export default AuthController;
