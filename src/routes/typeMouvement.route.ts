/* eslint-disable prettier/prettier */
import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';
import TypeMouvementController from '../controllers/typeMouvement.controller';
import { TypeMouvementDto } from '../dtos/typeMouvement.dto';


class TypeMouvementRoute implements Routes {
  public path = '/typeMouvement';
  public router = Router();
  public typeMouvementController = new TypeMouvementController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.typeMouvementController.getTypeMouvement);
    this.router.get(`${this.path}/:id(\\d+)`, this.typeMouvementController.findTypeMouvementById);
    this.router.post(`${this.path}`, validationMiddleware(TypeMouvementDto, 'body'), this.typeMouvementController.createTypeMouvement);
    this.router.put(`${this.path}/:id(\\d+)`, validationMiddleware(TypeMouvementDto, 'body', true), this.typeMouvementController.updateTypeMouvement);
    this.router.delete(`${this.path}/:id(\\d+)`, this.typeMouvementController.deleteTypeMouvement);
  }
}

export default TypeMouvementRoute;
