/* eslint-disable prettier/prettier */
import { EntityRepository, Repository } from 'typeorm';
import { CreateProduitDto } from '@dtos/produits.dto';
import { ProduitEntity } from '@entities/produits.entity';
import { HttpException } from '@exceptions/HttpException';
import { Produit } from '@interfaces/produits.interface';
import { isEmpty } from '@utils/util';

@EntityRepository()
class ProduitService extends Repository<ProduitEntity> {
  public async findAllProduit(): Promise<Produit[]> {
    const prods: Produit[] = await ProduitEntity.find();
    return prods;
  }

  public async findProduitById(produitId: number): Promise<Produit> {
    if (isEmpty(produitId)) throw new HttpException(400, "You're not produitId");

    const findProduit: Produit = await ProduitEntity.findOne({ where: { id: produitId } });
    if (!findProduit) throw new HttpException(409, "You're not produit");

    return findProduit;
  }

  public async createProduit(produitData: CreateProduitDto): Promise<Produit> {
    if (isEmpty(produitData)) throw new HttpException(400, "You're not produit");

    const produitResponse: Produit = await ProduitEntity.create({ ...produitData }).save();

    return produitResponse;
  }

  public async updateProduit(produitId: number, produitData: CreateProduitDto): Promise<Produit> {
    if (isEmpty(produitData)) throw new HttpException(400, "produitId not found");

    const findUser: Produit = await ProduitEntity.findOne({ where: { id: produitId } });
    if (!findUser) throw new HttpException(409, "produit not found");

  
    await ProduitEntity.update(produitId, { ...produitData });

    const updateProduit: Produit = await ProduitEntity.findOne({ where: { id: produitId } });
    return updateProduit;
  }


  public async deleteProduit(produitId: number): Promise<Produit> {
    //console.log(produitId);
    if (isEmpty(produitId)) throw new HttpException(400, "produitId not found");

    const findProduit: Produit = await ProduitEntity.findOne({ where: { id: produitId } });
    if (!findProduit) throw new HttpException(409, "produitId not found");

    await ProduitEntity.delete({ id: produitId });
    return findProduit;
  }

}

export default ProduitService;
