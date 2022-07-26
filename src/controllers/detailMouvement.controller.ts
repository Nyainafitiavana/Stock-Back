/* eslint-disable prettier/prettier */
import { NextFunction, Request, Response } from 'express';
import MouvementService from '../services/mouvement.service';
import { DetailMouvement } from '../interfaces/detailMouvement.interface';
import ProduitService from '@/services/produits.service';
import DetailmouvementService from '../services/detailMouvement.service';

class DetailMouvementController {
    public mouvementService = new MouvementService();
    public produitService = new ProduitService();
    public detaiService = new DetailmouvementService();

  public getAllDetail = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const query = req.query;
      const limit: number = +query.limit;
      const page: number = +query.page;
      const offset: number = limit * (page - 1);
      const findAllDetailMouvementsData: DetailMouvement[] = await this.detaiService.findAllDetailMouvement(limit, offset);
      const findAllDetailMouvements: DetailMouvement[] = await this.detaiService.findAllDetailMouvement(null, null);

      const rows = {
        data: findAllDetailMouvementsData,
        status: 200,
        totalRows: findAllDetailMouvements.length,
        limit: limit,
        page: page
      }

      res.status(200).json({ rows, message: 'findAll detail mouvement' });
    } catch (error) {
      next(error);
    }
  };

  public getDetailById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id:number = +req.params.id;
      const findAllDetailMouvementsData: DetailMouvement[] = await this.detaiService.findByIdDetail(id);

      const data = {
        status: 200,
        totalRows: findAllDetailMouvementsData.length,
        limit: null,
        page: 1,
        rows: findAllDetailMouvementsData,
      }

      res.status(200).json({ data, message: 'findAll detail mouvement' });
    } catch (error) {
      next(error);
    }
  }

 
  
  public getQuantityProductByDay = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        
      const findAllDetailMouvementsData: DetailMouvement[] = await this.detaiService.findQuantityProductByDay();

      res.status(200).json({ data: findAllDetailMouvementsData, message: 'findAll detail mouvement' });
    } catch (error) {
      next(error);
    }
  };

}

export default DetailMouvementController;
