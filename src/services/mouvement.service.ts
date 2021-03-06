/* eslint-disable prettier/prettier */
import { EntityRepository, Repository } from 'typeorm';
import { isEmpty } from '../utils/util';
import { HttpException } from '../exceptions/HttpException';
import { MouvementEntity } from '../entities/mouvement.entity';
import { Mouvement } from '@/interfaces/mouvement.interface';
import { CreateMouvementDto } from '@/dtos/mouvement.dto';
import { Produit } from '@/interfaces/produits.interface';
import { ProduitEntity } from '@/entities/produits.entity';

@EntityRepository()
class MouvementService extends Repository<MouvementEntity> {
  public async findAllMouvement(): Promise<Mouvement[]> {
    const mouvements: Mouvement[] = await MouvementEntity.find({ relations: ['user'] });
    return mouvements;
  }

  public async findProduitById(produitId: number): Promise<Produit> {
    if (isEmpty(produitId)) throw new HttpException(400, "You're not produitId");

    const findProduit: Produit = await ProduitEntity.findOne({ where: { id: produitId }, relations: ['category'] });
    if (!findProduit) throw new HttpException(409, "You're not produit");

    return findProduit;
  }

  public async findMouvementById(mvtId: number): Promise<Mouvement> {
    if (isEmpty(mvtId)) throw new HttpException(400, 'mouvement id not found');

    const findMouvement: Mouvement = await MouvementEntity.findOne({ where: { id: mvtId }, relations: ['user'] });
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
}
export default MouvementService;
