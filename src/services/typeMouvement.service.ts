/* eslint-disable prettier/prettier */
import { EntityRepository, Repository } from 'typeorm';
import { HttpException } from '@exceptions/HttpException';
import { isEmpty } from '@utils/util';
import { TypeMouvementEntity } from '../entities/typeMouvement.entity';
import { TypeMouvement } from '@/interfaces/typeMouvement.interface';
import { TypeMouvementDto } from '../dtos/typeMouvement.dto';

@EntityRepository()
class TypeMouvementService extends Repository<TypeMouvementEntity> {
  //find all category
  public async findAllType(limit: number, offset: number): Promise<TypeMouvement[]> {
    const typeMvt: TypeMouvement[] = await TypeMouvementEntity.find({take: limit, skip: offset});
    return typeMvt;
  }

  public async findTypeById(typeMouvementId: number): Promise<TypeMouvement[]> {
    if (isEmpty(typeMouvementId)) throw new HttpException(400, "You're not typeMouvementId");

    const findTypeMouvement: TypeMouvement[] = await TypeMouvementEntity.find({ where: { id: typeMouvementId }, take:1 });
    if (!findTypeMouvement) throw new HttpException(409, "You're not type");

    return findTypeMouvement;
  }

  public async createTypeMouvement(typeMouvementData: TypeMouvementDto): Promise<TypeMouvement> {
    if (isEmpty(typeMouvementData)) throw new HttpException(400, "You're not typeMouvement");

    const typeMouvementResponse: TypeMouvement = await TypeMouvementEntity.create({ ...typeMouvementData }).save();

    return typeMouvementResponse;
  }

  public async updateTypeMouvement(typeMouvementId: number, typeMouvementData: TypeMouvementDto): Promise<TypeMouvementDto> {
    if (isEmpty(typeMouvementData)) throw new HttpException(400, "typeMouvementId not found");

    const findTypeMouvement: TypeMouvement = await TypeMouvementEntity.findOne({ where: { id: typeMouvementId } });
    if (!findTypeMouvement) throw new HttpException(409, "typeMouvement not found");

  
    await TypeMouvementEntity.update(typeMouvementId, { ...typeMouvementData });

    const updateCategory: TypeMouvement = await TypeMouvementEntity.findOne({ where: { id: typeMouvementId } });
    return updateCategory;
  }


  public async deleteTypeMouvement(typeMouvementId: number): Promise<TypeMouvement> {
    //console.log(produitId);
    if (isEmpty(typeMouvementId)) throw new HttpException(400, "typeMouvementId not found");

    const findTypeMouvement: TypeMouvement = await TypeMouvementEntity.findOne({ where: { id: typeMouvementId } });
    if (!findTypeMouvement) throw new HttpException(409, "typeMouvementId not found");

    await TypeMouvementEntity.delete({ id: typeMouvementId });
    return findTypeMouvement;
  }

}

export default TypeMouvementService;
