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

class MouvementController {
    public mouvementService = new MouvementService();
    public produitService = new ProduitService();
    public detaiService = new DetailmouvementService();

  public getAllMouvement = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const findAllMouvementsData: Mouvement[] = await this.mouvementService.findAllMouvement();

      res.status(200).json({ data: findAllMouvementsData, message: 'findAll mouvement' });
    } catch (error) {
      next(error);
    }
  };

  public getMouvementById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const mouvementId = Number(req.params.id);
      const findMouvement: Mouvement = await this.mouvementService.findMouvementById(mouvementId);

      res.status(200).json({ data: findMouvement, message: 'findMouvement data success' });
    } catch (error) {
      next(error);
    }
  };

  public createMouvement = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const mouvementData: CreateMouvementDto = req.body;

      const createmouvementData: Mouvement = await this.mouvementService.createMouvement(mouvementData);
      const detail: any = mouvementData.detailMouvement;

      detail.forEach(async element => {
        const qt: number = element.quantite;
        const produit: Produit = await this.produitService.findProduitById(element.produit);
        const prixTotal: number = (produit.prix) * qt;
      
        const detailM: CreateDetailMouvementDto = {
          mouvement: createmouvementData,
          quantite: qt,
          produit: produit,
          prixTotal: prixTotal
        }
        const createDetail : DetailMouvement = await this.detaiService.createDetailMouvement(detailM);
        
      });

      res.status(201).json({ data: createmouvementData, message: 'created' });
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



}

export default MouvementController;
