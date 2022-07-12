/* eslint-disable prettier/prettier */
import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';
import MouvementController from '../controllers/mouvement.controller';
import { CreateMouvementDto } from '@/dtos/mouvement.dto';
import authMiddleware from '@/middlewares/auth.middleware';
import securityMiddleware from '@/middlewares/securityToken.middleware';

class MouvementRoute implements Routes {
  public path = '/api/mouvements';
  public router = Router();
  public mouvementController = new MouvementController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, authMiddleware, this.mouvementController.getAllMouvement);
    this.router.get(`${this.path}/:id(\\d+)`, authMiddleware, this.mouvementController.getMouvementById);
    this.router.post(`${this.path}`, securityMiddleware, validationMiddleware(CreateMouvementDto, 'body'), this.mouvementController.createMouvement);
    this.router.put(`${this.path}/:id(\\d+)`, securityMiddleware, validationMiddleware(CreateMouvementDto, 'body', true), this.mouvementController.updateMouvement);
    this.router.delete(`${this.path}/:id(\\d+)`, securityMiddleware, this.mouvementController.deleteMouvement);
    this.router.get(`${this.path}/findByDate`, this.mouvementController.getAllMouvementByDay);
  }
}

export default MouvementRoute;
