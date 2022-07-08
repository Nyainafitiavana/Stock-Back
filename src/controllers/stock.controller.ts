/* eslint-disable prettier/prettier */
import { NextFunction, Request, Response } from 'express';
import StockService from '../services/stock.service';
import { Stock } from '@/interfaces/stock.interface';
import { CreatestockDto } from '../dtos/stock.dto';

class StockController {
  public stockService = new StockService();

  public getAllStock = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const findAllStockData: Stock[] = await this.stockService.findAllStock();

      res.status(200).json({ data: findAllStockData, message: 'findAll' });
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
      const stockSeuil = 50;
      const findStock: Stock[] = await this.stockService.findStockProduitSeuil(stockSeuil);


      res.status(200).json({ data: findStock, message: 'findStock data success' });
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
