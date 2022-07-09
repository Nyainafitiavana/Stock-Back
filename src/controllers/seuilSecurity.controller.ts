/* eslint-disable prettier/prettier */
import { seuilSecurity } from '@/interfaces/seuilSecurity.interface';
import SeuilSecurityService from '@/services/seuilSecurity.service';
import { NextFunction, Request, Response } from 'express';
import { CreateSeuilSecurityDto } from '@/dtos/seuilSecurity.dto';

class SeuilSecurityController {
  public seuilSecurityService = new SeuilSecurityService();

  public getAllSeuilSecurity = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const findAllSeuilSecurityData: seuilSecurity[] = await this.seuilSecurityService.findAllSeuilSecurity();

      res.status(200).json({ data: findAllSeuilSecurityData, message: 'get all security thresolde success' });
    } catch (error) {
      next(error);
    }
  };

  public createSeuilSecurity = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const seuilSecurityData: CreateSeuilSecurityDto = req.body;
      const createSeuilData: seuilSecurity = await this.seuilSecurityService.createSeuilSecurity(seuilSecurityData);

      res.status(201).json({ data: createSeuilData, message: 'created security thresolde success' });
    } catch (error) {
      next(error);
    }
  };

  public updateSeuilSecurity = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const seuilSecurityId = Number(req.params.id);
      const seuilsecurityData: CreateSeuilSecurityDto = req.body;
      const updateSeuilSecurity: seuilSecurity = await this.seuilSecurityService.updateSeuilSecurity(seuilSecurityId, seuilsecurityData);

      res.status(200).json({ data: updateSeuilSecurity, message: 'security thresolde updated success' });
    } catch (error) {
      next(error);
    }
  };
}

export default SeuilSecurityController;
