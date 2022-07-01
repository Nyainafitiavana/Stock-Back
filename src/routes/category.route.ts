/* eslint-disable prettier/prettier */
import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';
import CategoryController from '@/controllers/category.controller';
import { CreateCategoryDto } from '@/dtos/category.dto';

class CategoryRoute implements Routes {
  public path = '/category';
  public router = Router();
  public categoryController = new CategoryController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.categoryController.getCategory);
    this.router.get(`${this.path}/:id(\\d+)`, this.categoryController.findCategoryById);
    this.router.post(`${this.path}`, validationMiddleware(CreateCategoryDto, 'body'), this.categoryController.createCategory);
    this.router.put(`${this.path}/:id(\\d+)`, validationMiddleware(CreateCategoryDto, 'body', true), this.categoryController.updateCategory);
    this.router.delete(`${this.path}/:id(\\d+)`, this.categoryController.deleteCategory);
  }
}

export default CategoryRoute;
