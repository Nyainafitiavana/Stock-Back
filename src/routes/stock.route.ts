/* eslint-disable prettier/prettier */
import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import StockController from '../controllers/stock.controller';
import { CreatestockDto } from '../dtos/stock.dto';
import validationMiddleware from '../middlewares/validation.middleware';
import securityMiddleware from '../middlewares/securityToken.middleware';

class StockRoute implements Routes {
  public path = '/stocks';
  public router = Router();
  public routeController = new StockController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, securityMiddleware, this.routeController.getAllStock);
     this.router.get(`${this.path}/:id(\\d+)`, securityMiddleware, this.routeController.getStock);
     this.router.post(`${this.path}`, securityMiddleware, validationMiddleware(CreatestockDto, 'body'), this.routeController.createStock);
     
  }
}

export default StockRoute;
