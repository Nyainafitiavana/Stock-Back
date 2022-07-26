/* eslint-disable prettier/prettier */
import { NextFunction, Request, Response } from 'express';
import MouvementService from '../services/mouvement.service';
import { Mouvement } from '@/interfaces/mouvement.interface';
import { CreateMouvementDto } from '@/dtos/mouvement.dto';
import { CreateDetailMouvementDto } from '../dtos/detailMouvement.dto';
import ProduitService from '@/services/produits.service';
import DetailmouvementService from '../services/detailMouvement.service';
import { DataStoredInToken} from '@/interfaces/auth.interface';
import { SECRET_KEY } from '@/config';
import { verify } from 'jsonwebtoken';
import { UserEntity } from '@/entities/users.entity';
import { TypeMouvementEntity } from '../entities/typeMouvement.entity';
import { Stock } from '@/interfaces/stock.interface';
import StockService from '@/services/stock.service';
import { StockEntity } from '@/entities/stock.entity';
import { CreatestockDto } from '@/dtos/stock.dto';

class MouvementController {
    public mouvementService = new MouvementService();
    public produitService = new ProduitService();
    public detaiService = new DetailmouvementService();
    public stockService = new StockService();

  public getAllMouvement = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const query = req.query;
      const limit: number = +query.limit;
      const page: number = +query.page;
      const offset: number = limit * (page - 1);

      const findAllMouvementsData: Mouvement[] = await this.mouvementService.findAllMouvement(limit, offset);
      const findAllMouvements: Mouvement[] = await this.mouvementService.findAllMouvement(null, null);
      const data: any = {
        status: 200,
        totalRows: findAllMouvements.length,
        limit: limit,
        page: page,
        rows: findAllMouvementsData
      }

      res.status(200).json({ data, message: 'findAll mouvement' });
    } catch (error) {
      next(error);
    }
  };

  public getMouvementById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const mouvementId = Number(req.params.id);
      const findMouvement: Mouvement[] = await this.mouvementService.findMouvementById(mouvementId);
      const data: any = {
        status: 200,
        totalRows: findMouvement.length,
        limit: null,
        page: 1,
        rows: findMouvement
      }
      res.status(200).json({ data, message: 'findMouvement data success' });
    } catch (error) {
      next(error);
    }
  };
  
  public createMouvement = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      //get user connected
      const Authorization = req.cookies['Authorization'] || (req.header('Authorization') ? req.header('Authorization').split('Bearer ')[1] : null);
      const secretKey: string = SECRET_KEY;
      const { id } = (await verify(Authorization, secretKey)) as DataStoredInToken;
      const findUser = await UserEntity.findOne(id, { select: ['id', 'email', 'password'] });
      const motif = req.body.motif;
      const date: Date = new Date()
      const day = ("0" + date.getDate()).slice(-2);
      const mounth = ("0" + (date.getMonth() + 1)).slice(-2);
      const year = date.getFullYear();
      const combiDate:string = ""+year+"-"+mounth+"-"+day;      
      
      if (motif == "Vente") {
        const typeSortie: any = await TypeMouvementEntity.findOne({id: 2});
        const object: any = {
          user: findUser,
          motif: req.body.motif,
          createdAt: combiDate,
          typeMouvement: typeSortie,
          detailMouvement: req.body.detailMouvement
        };
        //create new object 
        const mouvementData: CreateMouvementDto = object;
        const createmouvementData: Mouvement = await this.mouvementService.createMouvement(mouvementData);
        const detail: any = mouvementData.detailMouvement;

        detail.forEach(async element => {
          const qt: number = element.quantite;
          const produit: any = await this.produitService.findProduitById(element.produit);
          const prixTotal: number = (produit.prix) * qt;
          const stock: Stock = await StockEntity.findOne({produit: produit});
          //create new stock data
          const newStockData: CreatestockDto = {
            quantite: (stock.quantite) - qt,
            produit: produit
          }
          await this.stockService.updateStock(stock.id, newStockData);// set new quantite
          //created detailMouvementDto
          const detailM: CreateDetailMouvementDto = {
            mouvement: createmouvementData,
            quantite: qt,
            produit: produit,
            prixTotal: prixTotal
          }

          await this.detaiService.createDetailMouvement(detailM);
        });

        res.status(201).json({ data: createmouvementData, message: 'Sortie en stock success' });

      }else if (motif == "EntrerStock") {
        const typeEntrer: any = await TypeMouvementEntity.findOne({id: 1});
        const object: any = {
          user: findUser,
          motif: req.body.motif,
          createdAt: combiDate,
          typeMouvement: typeEntrer,
          detailMouvement: req.body.detailMouvement
        };
        //create new object 
        const mouvementData: CreateMouvementDto = object;
        const createmouvementData: Mouvement = await this.mouvementService.createMouvement(mouvementData);
        const detail: any = mouvementData.detailMouvement;

        detail.forEach(async element => {
          const qt: number = element.quantite;
          const produit: any = await this.produitService.findProduitById(element.produit);
          const prixTotal: number = (produit.prix) * qt;
          const stock: Stock = await StockEntity.findOne({produit: produit});
          //create new stock data
          const newStockData: CreatestockDto = {
            quantite: (stock.quantite) + qt,
            produit: produit
          }
          await this.stockService.updateStock(stock.id, newStockData);// set new quantite
          //created detailMouvementDto
          const detailM: CreateDetailMouvementDto = {
            mouvement: createmouvementData,
            quantite: qt,
            produit: produit,
            prixTotal: prixTotal
          }
          
          await this.detaiService.createDetailMouvement(detailM);
        });

        res.status(201).json({ data: createmouvementData, message: 'Entrer en stock success' });
      }
    } catch (error) {
      next(error);
    }
  };

  public updateMouvement = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const mouvementId = Number(req.params.id);
      const mouvementData: CreateMouvementDto = req.body;
      const updateMouvementData: Mouvement = await this.mouvementService.updateMouvement(mouvementId, mouvementData);

      res.status(200).json({ data: updateMouvementData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };


  public deleteMouvement = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const mouvementId = Number(req.params.id);
      //console.log(produitId);
      const deleteMouvementData: Mouvement = await this.mouvementService.deleteMouvement(mouvementId);

      res.status(200).json({ data: deleteMouvementData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };

  public getAllMouvementByDay = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const date: string = req.query.date as string;
        const limit = +req.query.limit;
        const page = +req.query.page;
        const offset = limit * (page - 1);

        const findMouvementData: Mouvement[] = await this.mouvementService.findMouvementByDay(date,limit,offset);
        const data:any = {
          rows: findMouvementData,
          status: 200,
          totalRows: findMouvementData.length,
          limit: limit,
          page: page
        };

        res.status(200).json({ data, message: 'findAll detail mouvement' });
    } catch (error) {
      next(error);
    }
  };
}

export default MouvementController;
