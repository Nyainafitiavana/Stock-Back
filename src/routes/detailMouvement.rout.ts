/* eslint-disable prettier/prettier */
import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';
import MouvementController from '../controllers/mouvement.controller';
import { CreateMouvementDto } from '@/dtos/mouvement.dto';
import authMiddleware from '@/middlewares/auth.middleware';
import securityMiddleware from '@/middlewares/securityToken.middleware';
import DetailMouvementController from '../controllers/detailMouvement.controller';

class DetailMouvementRoute implements Routes {
  public path = '/detailMouvements';
  public router = Router();
  public detailMouvementController = new DetailMouvementController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, authMiddleware, this.detailMouvementController.getAllDetail);
    this.router.get(`${this.path}/quantiteParJour`, securityMiddleware, this.detailMouvementController.getQuantityProductByDay);
  }
}

export default DetailMouvementRoute;
