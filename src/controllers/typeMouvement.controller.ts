/* eslint-disable prettier/prettier */
import { NextFunction, Request, Response } from 'express';
import { TypeMouvement } from '@/interfaces/typeMouvement.interface';
import TypeMouvementService from '../services/typeMouvement.service';
import { TypeMouvementDto } from '../dtos/typeMouvement.dto';


class TypeMouvementController {
  public typeMouvementService = new TypeMouvementService();

  public getTypeMouvement = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const query = req.query;
      const limit: number = +query.limit;
      const page: number = +query.page;
      const offset: number = limit * (page - 1);
      const findAllType: TypeMouvement[] = await this.typeMouvementService.findAllType(limit, offset);
      
      const rows = {
        data: findAllType,
        status: 200,
        totalRows: findAllType.length,
        limit: limit,
        page: page
      }

      res.status(200).json({ rows, message: 'get all typeMouvement success' });
    } catch (error) {
      next(error);
    }
  };

  public createTypeMouvement = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const typeMouvementData: TypeMouvementDto = req.body;
      const createmvtData: TypeMouvement = await this.typeMouvementService.createTypeMouvement(typeMouvementData);

      res.status(201).json({ data: createmvtData, message: 'created typeMouvement success' });
    } catch (error) {
      next(error);
    }
  };

  public updateTypeMouvement = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const typeMouvementId = Number(req.params.id);
      const typeMouvementData: TypeMouvementDto = req.body;
      const updateTypeMouvementData: TypeMouvement = await this.typeMouvementService.updateTypeMouvement(typeMouvementId, typeMouvementData);

      res.status(200).json({ data: updateTypeMouvementData, message: 'typeMouvement updated success' });
    } catch (error) {
      next(error);
    }
  };

  
  public findTypeMouvementById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const typeMouvementId = Number(req.params.id);
      const findMouvementByIdData: TypeMouvement[] = await this.typeMouvementService.findTypeById(typeMouvementId);

      const rows = {
        data: findMouvementByIdData,
        status: 200,
        totalRows: findMouvementByIdData.length,
        limit: null,
        page: null
      }

      res.status(200).json({ rows, message: 'findTypeMouvement data success' });
    } catch (error) {
      next(error);
    }
  };


  public deleteTypeMouvement = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const typeMouvementId = Number(req.params.id);
      //console.log(produitId);
      const deleteTypeMouvementData: TypeMouvement = await this.typeMouvementService.deleteTypeMouvement(typeMouvementId);

      res.status(200).json({ data: deleteTypeMouvementData, message: 'typeMouvement deleted success' });
    } catch (error) {
      next(error);
    }
  };
  

  
}

export default TypeMouvementController;
