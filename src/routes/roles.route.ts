/* eslint-disable prettier/prettier */
import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';
import RolesController from '@/controllers/roles.controller';
import { CreateRolesDto } from '@/dtos/roles.dto';

class RoleRoute implements Routes {
  public path = '/role';
  public router = Router();
  public roleController = new RolesController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.roleController.getRoles);
    this.router.get(`${this.path}/:id(\\d+)`, this.roleController.findRoleById);
    this.router.post(`${this.path}`, validationMiddleware(CreateRolesDto, 'body'), this.roleController.createRole);
    this.router.put(`${this.path}/:id(\\d+)`, validationMiddleware(CreateRolesDto, 'body', true), this.roleController.updateRole);
    this.router.delete(`${this.path}/:id(\\d+)`, this.roleController.deleteRole);
  }
}

export default RoleRoute;
