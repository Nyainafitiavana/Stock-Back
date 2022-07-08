/* eslint-disable prettier/prettier */
import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import StockController from '../controllers/stock.controller';
import { CreatestockDto } from '../dtos/stock.dto';
import validationMiddleware from '../middlewares/validation.middleware';
import securityMiddleware from '../middlewares/securityToken.middleware';

class StockRoute implements Routes {
  public path = '/api';
  public router = Router();
  public routeController = new StockController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/stocks`, securityMiddleware, this.routeController.getAllStock);
     this.router.get(`${this.path}/stocks/:id(\\d+)`, securityMiddleware, this.routeController.getStock);
     this.router.get(`${this.path}/stocks-rupture`, securityMiddleware, this.routeController.getSeuilStock);
     this.router.post(`${this.path}/stocks`, securityMiddleware, validationMiddleware(CreatestockDto, 'body'), this.routeController.createStock);
     
  }
}

export default StockRoute;
