/* eslint-disable prettier/prettier */
import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';
import ProduitController from '@/controllers/produit.controller';
import { CreateProduitDto } from '@/dtos/produits.dto';

class ProduitRoute implements Routes {
  public path = '/produits';
  public router = Router();
  public produitController = new ProduitController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.produitController.getAllProduit);
    this.router.get(`${this.path}/:id(\\d+)`, this.produitController.getProduit);
    this.router.post(`${this.path}`, validationMiddleware(CreateProduitDto, 'body'), this.produitController.createProduit);
    this.router.put(`${this.path}/:id(\\d+)`, validationMiddleware(CreateProduitDto, 'body', true), this.produitController.updateProduit);
    this.router.delete(`${this.path}/:id(\\d+)`, this.produitController.deleteProduit);
  }
}

export default ProduitRoute;
