/* eslint-disable prettier/prettier */
import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import authMiddleware from '@/middlewares/auth.middleware';
import securityMiddleware from '@/middlewares/securityToken.middleware';
import DetailMouvementController from '../controllers/detailMouvement.controller';

class DetailMouvementRoute implements Routes {
  public path = '/api/detail-mouvements';
  public router = Router();
  public detailMouvementController = new DetailMouvementController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, authMiddleware, this.detailMouvementController.getAllDetail);
    this.router.get(`${this.path}/quantiteParJour`, securityMiddleware, this.detailMouvementController.getQuantityProductByDay);
    this.router.get(`${this.path}/:id(\\d+)`,authMiddleware, this.detailMouvementController.getDetailById);
  }
}

export default DetailMouvementRoute;
