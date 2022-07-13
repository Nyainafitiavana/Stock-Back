/* eslint-disable prettier/prettier */
import { EntityRepository, Repository } from 'typeorm';
import { isEmpty } from '../utils/util';
import { HttpException } from '../exceptions/HttpException';
import { MouvementEntity } from '../entities/mouvement.entity';
import { Mouvement } from '@/interfaces/mouvement.interface';
import { CreateMouvementDto } from '@/dtos/mouvement.dto';

@EntityRepository()
class MouvementService extends Repository<MouvementEntity> {
  public async findAllMouvement(limit: number, offset: number): Promise<Mouvement[]> {
    const mouvements: Mouvement[] = await MouvementEntity.find({ relations: ['user'], order:{'id':'ASC'}, take: limit, skip: offset});
    return mouvements;
  }

  public async findMouvementById(mvtId: number): Promise<Mouvement[]> {
    if (isEmpty(mvtId)) throw new HttpException(400, 'mouvement id not found');

    const findMouvement: Mouvement[] = await MouvementEntity.find({ where: { id: mvtId }, relations: ['user'], take:1 });
    if (!findMouvement) throw new HttpException(409, "You're not mouvement");

    return findMouvement;
  }

  public async createMouvement(mouvementData: CreateMouvementDto): Promise<Mouvement> {
    if (isEmpty(mouvementData)) throw new HttpException(400, 'id mouvement not found');
    try {
      const mouvementResponse: Mouvement = await MouvementEntity.create({ ...mouvementData }).save();
      return mouvementResponse;
    } catch (e) {
      throw e;
    }
  }

  public async updateMouvement(mvtId: number, mouvementData: CreateMouvementDto): Promise<Mouvement> {
    if (isEmpty(mouvementData)) throw new HttpException(400, 'mouvementId not found');

    const findMouvement: Mouvement = await MouvementEntity.findOne({ where: { id: mvtId } });
    if (!findMouvement) throw new HttpException(409, 'mouvement not found');

    await MouvementEntity.update(mvtId, { ...mouvementData });

    const updateMouvement: Mouvement = await MouvementEntity.findOne({ where: { id: mvtId } });
    return updateMouvement;
  }

  public async deleteMouvement(mvtId: number): Promise<Mouvement> {
    //console.log(produitId);
    if (isEmpty(mvtId)) throw new HttpException(400, 'mouvementId not found');

    const findMouvement: Mouvement = await MouvementEntity.findOne({ where: { id: mvtId } });
    if (!findMouvement) throw new HttpException(409, 'mouvementId not found');

    await MouvementEntity.delete({ id: mvtId });
    return findMouvement;
  }

  public async findMouvementByDay(date :string, limit: number, offset: number): Promise<Mouvement[]> {
    const value = "Vente";
    const findMouvementByDate: Mouvement[] = await MouvementEntity.createQueryBuilder('qb')                                                                  
                                                                   .where('qb.createdAt = :dateJour', {dateJour: date})
                                                                   .andWhere('qb.motif like :q', { q: `%${value}%` })
                                                                   .limit(limit)
                                                                   .offset(offset)
                                                                   .getMany();
    if (!findMouvementByDate) throw new HttpException(409, "You're not mouvement");

    return findMouvementByDate;
  }
}
export default MouvementService;
