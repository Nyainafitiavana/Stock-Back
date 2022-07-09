/* eslint-disable prettier/prettier */
import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';
import ProduitController from '@/controllers/produit.controller';
import { CreateProduitDto } from '@/dtos/produits.dto';
import securityMiddleware from '../middlewares/securityToken.middleware';
import authMiddleware from '@middlewares/auth.middleware';

class ProduitRoute implements Routes {
  public path = '/api/produits';
  public router = Router();
  public produitController = new ProduitController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`,authMiddleware, this.produitController.getAllProduit);
    this.router.get(`${this.path}/:id(\\d+)`,authMiddleware, this.produitController.getProduit);
    this.router.post(`${this.path}`,securityMiddleware, validationMiddleware(CreateProduitDto, 'body'), this.produitController.createProduit);
    this.router.put(`${this.path}/:id(\\d+)`,securityMiddleware, validationMiddleware(CreateProduitDto, 'body', true), this.produitController.updateProduit);
    this.router.delete(`${this.path}/:id(\\d+)`,securityMiddleware, this.produitController.deleteProduit);
  }
}

export default ProduitRoute;
