/* eslint-disable prettier/prettier */
import { NextFunction, Request, Response } from 'express';
import StockService from '../services/stock.service';
import { Stock } from '@/interfaces/stock.interface';
import { CreatestockDto } from '../dtos/stock.dto';
import SeuilSecurityService from '@/services/seuilSecurity.service';
import { seuilSecurity } from '@/interfaces/seuilSecurity.interface';

class StockController {
  public stockService = new StockService();
  public seuilSecurityService = new SeuilSecurityService
  public getAllStock = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const limit: number = +req.query.limit;
      const page: number = +req.query.page;
      const offset: number = limit * (page - 1);
      const findAllStockData: Stock[] = await this.stockService.findAllStock(limit, offset);
      const rows = {
        data: findAllStockData,
        status: 200,
        totalRows: findAllStockData.length,
        limit: limit,
        page: page
      }
      res.status(200).json({ rows, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getStock = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const stockId = Number(req.params.id);
      const findStock: Stock = await this.stockService.findStockById(stockId);

      res.status(200).json({ data: findStock, message: 'findStock data success' });
    } catch (error) {
      next(error);
    }
  };

  public getSeuilStock = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const limit = null;
      const page = null;
      const stockSeuil: seuilSecurity = await this.seuilSecurityService.findSeuilById();
      const findStock: Stock[] = await this.stockService.findStockProduitSeuil(stockSeuil.seuil);

      const rows = {
        data: findStock,
        status: 200,
        totalRows: findStock.length,
        limit: limit,
        page: page
      }

      res.status(200).json({ rows, message: 'findStock data success' });
    } catch (error) {
      next(error);
    }
  };

  public createStock = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const stockData: CreatestockDto = req.body;
      const createStockData: Stock = await this.stockService.createStock(stockData);

      res.status(201).json({ data: createStockData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };
}
export default StockController;
