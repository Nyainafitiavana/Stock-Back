/* eslint-disable prettier/prettier */
import { NextFunction, Request, Response } from 'express';
import { Roles } from '@interfaces/roles.interface';
import RolesService from '@services/roles.service';
import { CreateRolesDto } from '@/dtos/roles.dto';

class RolesController {
  public roleService = new RolesService();

  public getRoles = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const query = req.query;
      const limit: number = +query.limit;
      const page: number = +query.page;
      const offset: number = limit * (page - 1);
      const findAllRolesData: Roles[] = await this.roleService.findAllRoles(limit, offset);
      const findAllRoles: Roles[] = await this.roleService.findAllRoles(null, null);

      const data = {
        status: 200,
        totalRows: findAllRoles.length,
        limit: limit,
        page: page,
        rows: findAllRolesData,
      }

      res.status(200).json({ data, message: 'get all roles success' });
    } catch (error) {
      next(error);
    }
  };

  public createRole = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const roleData: CreateRolesDto = req.body;
      const createRolesData: Roles = await this.roleService.createRole(roleData);

      res.status(201).json({ data: createRolesData, message: 'created role success' });
    } catch (error) {
      next(error);
    }
  };

  public updateRole = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const RoleId = Number(req.params.id);
      const roleData: CreateRolesDto = req.body;
      const updateRoleData: Roles = await this.roleService.updateRole(RoleId, roleData);

      res.status(200).json({ data: updateRoleData, message: 'role updated success' });
    } catch (error) {
      next(error);
    }
  };

  
  public findRoleById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const RoleId = Number(req.params.id);
      const findRoleByIdData: Roles[] = await this.roleService.findRolesById(RoleId);
      const data = {
        status: 200,
        totalRows: findRoleByIdData.length,
        limit: null,
        page: 1,
        rows: findRoleByIdData,
      }
      res.status(200).json({ data, message: 'findRole data success' });
    } catch (error) {
      next(error);
    }
  };


  public deleteRole = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const roleId = Number(req.params.id);
      const deleteRoleData: Roles = await this.roleService.deleteRole(roleId);

      res.status(200).json({ data: deleteRoleData, message: 'role deleted success' });
    } catch (error) {
      next(error);
    }
  };
  

  
}

export default RolesController;
