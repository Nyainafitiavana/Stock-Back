/* eslint-disable prettier/prettier */
import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';
import MouvementController from '../controllers/mouvement.controller';
import { CreateMouvementDto } from '@/dtos/mouvement.dto';

class MouvementRoute implements Routes {
  public path = '/mouvements';
  public router = Router();
  public mouvementController = new MouvementController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.mouvementController.getAllMouvement);
    this.router.get(`${this.path}/:id(\\d+)`, this.mouvementController.getMouvementById);
    this.router.post(`${this.path}`, validationMiddleware(CreateMouvementDto, 'body'), this.mouvementController.createMouvement);
    this.router.put(`${this.path}/:id(\\d+)`, validationMiddleware(CreateMouvementDto, 'body', true), this.mouvementController.updateMouvement);
    this.router.delete(`${this.path}/:id(\\d+)`, this.mouvementController.deleteMouvement);
  }
}

export default MouvementRoute;
