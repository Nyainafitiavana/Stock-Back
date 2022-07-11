/* eslint-disable prettier/prettier */
import { NextFunction, Request, Response } from 'express';
import MouvementService from '../services/mouvement.service';
import { Mouvement } from '@/interfaces/mouvement.interface';
import { CreateMouvementDto } from '@/dtos/mouvement.dto';
import { DetailMouvement } from '../interfaces/detailMouvement.interface';
import { CreateDetailMouvementDto } from '../dtos/detailMouvement.dto';
import { Produit } from '../interfaces/produits.interface';
import ProduitService from '@/services/produits.service';
import DetailmouvementService from '../services/detailMouvement.service';
import { CreateLoginDto, CreateUserDto } from '@/dtos/users.dto';
import { DataStoredInToken, RequestWithUser } from '@/interfaces/auth.interface';
import { SECRET_KEY } from '@/config';
import { verify } from 'jsonwebtoken';
import { UserEntity } from '@/entities/users.entity';
import { User } from '@/interfaces/users.interface';

class DetailMouvementController {
    public mouvementService = new MouvementService();
    public produitService = new ProduitService();
    public detaiService = new DetailmouvementService();

  public getAllDetail = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const findAllDetailMouvementsData: DetailMouvement[] = await this.detaiService.findAllDetailMouvement();

      res.status(200).json({ data: findAllDetailMouvementsData, message: 'findAll detail mouvement' });
    } catch (error) {
      next(error);
    }
  };

  public getAllDetailProduit = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const date = new Date();
      const findAllDetailMouvementsData: DetailMouvement[] = await this.detaiService.findMouvementByDay(date,50,0);

      res.status(200).json({ data: findAllDetailMouvementsData, message: 'findAll detail mouvement' });
    } catch (error) {
      next(error);
    }
  };
  
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
