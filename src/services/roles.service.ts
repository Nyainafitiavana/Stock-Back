/* eslint-disable prettier/prettier */
import { EntityRepository, Repository } from 'typeorm';
import { CreateRolesDto } from '@dtos/roles.dto';
import { RoleEntity } from '@entities/roles.entity';
import { HttpException } from '@exceptions/HttpException';
import { Roles } from '@interfaces/roles.interface';
import { isEmpty } from '@utils/util';

@EntityRepository()
class RolesService extends Repository<RoleEntity> {
  //find all roles
  public async findAllRoles(limit: number, offset: number): Promise<Roles[]> {
    const roles: Roles[] = await RoleEntity.find({take: limit, skip: offset});
    return roles;
  }

  public async findRolesById(roleId: number): Promise<Roles[]> {
    if (isEmpty(roleId)) throw new HttpException(400, "You're not categoryId");

    const findRole: Roles[] = await RoleEntity.find({ where: { id: roleId }, take: 1 });
    if (!findRole) throw new HttpException(409, "You're not role");

    return findRole;
  }

  public async createRole(roleData: CreateRolesDto): Promise<Roles> {
    if (isEmpty(roleData)) throw new HttpException(400, "You're not role");

    const roleResponse: Roles = await RoleEntity.create({ ...roleData }).save();

    return roleResponse;
  }

  public async updateRole(roleId: number, roleData: CreateRolesDto): Promise<Roles> {
    if (isEmpty(roleData)) throw new HttpException(400, "roleId not found");

    const findRole: Roles = await RoleEntity.findOne({ where: { id: roleId } });
    if (!findRole) throw new HttpException(409, "role not found");
  
    await RoleEntity.update(roleId, { ...roleData });

    const updateRole: Roles = await RoleEntity.findOne({ where: { id: roleId } });
    return updateRole;
  }


  public async deleteRole(roleId: number): Promise<Roles> {

    if (isEmpty(roleId)) throw new HttpException(400, "roleId not found");

    const findRole: Roles = await RoleEntity.findOne({ where: { id: roleId } });
    if (!findRole) throw new HttpException(409, "produitId not found");

    await RoleEntity.delete({ id: roleId });
    return findRole;
  }

}

export default RolesService;
