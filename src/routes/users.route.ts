/* eslint-disable prettier/prettier */
import { Router } from 'express';
import UsersController from '@controllers/users.controller';
import { CreateUserDto } from '@dtos/users.dto';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';
import securityMiddleware from '../middlewares/securityToken.middleware';

class UsersRoute implements Routes {
  public path = '/api/users';
  public router = Router();
  public usersController = new UsersController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, securityMiddleware, this.usersController.getUsers);
    this.router.get(`${this.path}/:id(\\d+)`, securityMiddleware, this.usersController.getUserById);
    this.router.post(`${this.path}`, securityMiddleware, validationMiddleware(CreateUserDto, 'body'), this.usersController.createUser);
    this.router.put(`${this.path}/:id(\\d+)`, securityMiddleware, validationMiddleware(CreateUserDto, 'body', true), this.usersController.updateUser);
    this.router.delete(`${this.path}/:id(\\d+)`, securityMiddleware, this.usersController.deleteUser);
  }
}

export default UsersRoute;
