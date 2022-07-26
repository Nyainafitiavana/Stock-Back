/* eslint-disable prettier/prettier */
import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';
import securityMiddleware from '../middlewares/securityToken.middleware';
import SeuilSecurityController from '@/controllers/seuilSecurity.controller';
import { CreateSeuilSecurityDto } from '@/dtos/seuilSecurity.dto';

class SeuilSecurityRoute implements Routes {
  public path = '/api/seuil-security';
  public router = Router();
  public seuilSecurityController = new SeuilSecurityController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`,securityMiddleware, this.seuilSecurityController.getAllSeuilSecurity);
    this.router.post(`${this.path}`,securityMiddleware, validationMiddleware(CreateSeuilSecurityDto, 'body'), this.seuilSecurityController.createSeuilSecurity);
    this.router.put(`${this.path}/:id(\\d+)`,securityMiddleware, validationMiddleware(CreateSeuilSecurityDto, 'body', true), this.seuilSecurityController.updateSeuilSecurity);
  }
}

export default SeuilSecurityRoute;
