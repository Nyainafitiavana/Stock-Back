/* eslint-disable prettier/prettier */
import { EntityRepository, Repository } from 'typeorm';
import { isEmpty } from '../utils/util';
import { HttpException } from '../exceptions/HttpException';

import { DetailMouvement } from '../interfaces/detailMouvement.interface';
import { DetailMouvementEntity } from '../entities/detailMouvement.entity';
import { CreateDetailMouvementDto } from '../dtos/detailMouvement.dto';

@EntityRepository()
class DetailmouvementService extends Repository<DetailMouvementEntity> {
  public async findAllDetailMouvement(): Promise<DetailMouvement[]> {
    const detaiMouvements: DetailMouvement[] = await DetailMouvementEntity.find({ relations: ['mouvement', 'produit'] });
    return detaiMouvements;
  }

  //   public async findProduitById(produitId: number): Promise<Produit> {
  //     if (isEmpty(produitId)) throw new HttpException(400, "You're not produitId");

  //     const findProduit: Produit = await ProduitEntity.findOne({ where: { id: produitId }, relations: ['category'] });
  //     if (!findProduit) throw new HttpException(409, "You're not produit");

  //     return findProduit;
  //   }

  public async findDetailMouvementById(detailmvtId: number): Promise<DetailMouvement> {
    if (isEmpty(detailmvtId)) throw new HttpException(400, 'mouvement details id not found');

    const findDetailMouvement: DetailMouvement = await DetailMouvementEntity.findOne({ where: { id: detailmvtId }, relations: ['user'] });
    if (!findDetailMouvement) throw new HttpException(409, "You're not detail mouvement");

    return findDetailMouvement;
  }

  public async createDetailMouvement(detailMouvementData: CreateDetailMouvementDto): Promise<DetailMouvement> {
    if (isEmpty(detailMouvementData)) throw new HttpException(400, 'id mouvement detail not found');
    try {
      const detailMouvementResponse: DetailMouvement = await DetailMouvementEntity.create({ ...detailMouvementData }).save();
      return detailMouvementResponse;
    } catch (e) {
      throw e;
    }
  }

  public async updateDetailMouvement(detailmvtId: number, detailmouvementData: CreateDetailMouvementDto): Promise<DetailMouvement> {
    if (isEmpty(detailmouvementData)) throw new HttpException(400, 'detailmouvementId not found');

    const findDetailMouvement: DetailMouvement = await DetailMouvementEntity.findOne({ where: { id: detailmvtId } });
    if (!findDetailMouvement) throw new HttpException(409, 'detailmouvement not found');

    await DetailMouvementEntity.update(detailmvtId, { ...detailmouvementData });

    const updateDetailMouvement: DetailMouvement = await DetailMouvementEntity.findOne({ where: { id: detailmvtId } });
    return updateDetailMouvement;
  }

  public async deleteDetailMouvement(detailmvtId: number): Promise<DetailMouvement> {
    //console.log(produitId);
    if (isEmpty(detailmvtId)) throw new HttpException(400, 'mouvementId not found');

    const findDetailMouvement: DetailMouvement = await DetailMouvementEntity.findOne({ where: { id: detailmvtId } });
    if (!findDetailMouvement) throw new HttpException(409, 'mouvementId not found');

    await DetailMouvementEntity.delete({ id: detailmvtId });
    return findDetailMouvement;
  }
}
export default DetailmouvementService;
