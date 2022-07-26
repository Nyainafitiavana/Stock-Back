/* eslint-disable prettier/prettier */
import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';
import CategoryController from '@/controllers/category.controller';
import { CreateCategoryDto } from '@/dtos/category.dto';
import securityMiddleware from '../middlewares/securityToken.middleware';
import authMiddleware from '@middlewares/auth.middleware';

class CategoryRoute implements Routes {
  public path = '/api/category';
  public router = Router();
  public categoryController = new CategoryController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`,authMiddleware, this.categoryController.getCategory);
    this.router.get(`${this.path}/:id(\\d+)`,authMiddleware, this.categoryController.findCategoryById);
    this.router.post(`${this.path}`,securityMiddleware, validationMiddleware(CreateCategoryDto, 'body'), this.categoryController.createCategory);
    this.router.put(`${this.path}/:id(\\d+)`,securityMiddleware, validationMiddleware(CreateCategoryDto, 'body', true), this.categoryController.updateCategory);
    this.router.delete(`${this.path}/:id(\\d+)`,securityMiddleware, this.categoryController.deleteCategory);
  }
}

export default CategoryRoute;
