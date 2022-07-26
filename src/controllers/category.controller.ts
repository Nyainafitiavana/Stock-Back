/* eslint-disable prettier/prettier */
import { NextFunction, Request, Response } from 'express';
import { Category } from '@interfaces/category.interface';
import categoryService from '@services/category.service';
import { CreateCategoryDto } from '@/dtos/category.dto';

class CategoryController {
  public categoryService = new categoryService();

  public getCategory = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const query = req.query;
      const limit: number = +query.limit;
      const page: number = +query.page;
      const offset: number = limit * (page - 1);
      const findAllCategorysData: Category[] = await this.categoryService.findAllCategory(limit, offset);
      const findAllCategorys: Category[] = await this.categoryService.findAllCategory(null, null);

      const data = {
        status: 200,
        totalRows: findAllCategorys.length,
        limit: limit,
        page: page,
        rows: findAllCategorysData, 
      }

      res.status(200).json({ data, message: 'get all category success' });
    } catch (error) {
      next(error);
    }
  };

  public createCategory = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const categoryData: CreateCategoryDto = req.body;
      const createCatData: Category = await this.categoryService.createCategory(categoryData);

      res.status(201).json({ data: createCatData, message: 'created category success' });
    } catch (error) {
      next(error);
    }
  };

  public updateCategory = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const CategoryId = Number(req.params.id);
      const categoryData: CreateCategoryDto = req.body;
      const updateCategoryData: Category = await this.categoryService.updateCategory(CategoryId, categoryData);

      res.status(200).json({ data: updateCategoryData, message: 'category updated success' });
    } catch (error) {
      next(error);
    }
  };

  
  public findCategoryById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const CategoryId = Number(req.params.id);
      const findCategoryByIdData: Category[] = await this.categoryService.findCategoryById(CategoryId);
      const data: any = {
        status: 200,
        totalRows: findCategoryByIdData.length,
        limit: null,
        page: 1,
        rows: findCategoryByIdData
      }
      res.status(200).json({ data, message: 'findCategory data success' });
    } catch (error) {
      next(error);
    }
  };


  public deleteCategory = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const categoryId = Number(req.params.id);
      //console.log(produitId);
      const deleteCategoryData: Category = await this.categoryService.deleteCategory(categoryId);

      res.status(200).json({ data: deleteCategoryData, message: 'category deleted success' });
    } catch (error) {
      next(error);
    }
  };
  

  
}

export default CategoryController;
