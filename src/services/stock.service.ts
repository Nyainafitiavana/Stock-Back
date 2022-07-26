/* eslint-disable prettier/prettier */
import { EntityRepository, Repository } from 'typeorm';
import { StockEntity } from '../entities/stock.entity';
import { Stock } from '../interfaces/stock.interface';
import { CreatestockDto } from '../dtos/stock.dto';
import { isEmpty } from '../utils/util';
import { HttpException } from '../exceptions/HttpException';

@EntityRepository()
class StockService extends Repository<StockEntity> {
  public async findAllStock(limit: number, offset: number): Promise<Stock[]> {
    const stocks: Stock[] = await StockEntity.find({ relations: ['produit'], take: limit, skip: offset });
    return stocks;
  }

  public async findStockById(stockId: number): Promise<Stock> {
    if (isEmpty(stockId)) throw new HttpException(400, 'stock id not found');

    const findStock: Stock = await StockEntity.findOne({ where: { id: stockId }, relations: ['produit'] });
    if (!findStock) throw new HttpException(409, "You're not produit");

    return findStock;
  }
  
  public async findStockProduitSeuil(seuil: number): Promise<Stock[]> {
    const getResult: Stock[] = await StockEntity.createQueryBuilder('stock')
                                                .innerJoinAndSelect('stock.produit', 'produit'
                                                )
                                                .where('stock.quantite <= :sl', {sl: seuil})
                                                .getMany();
    if (!getResult) throw new HttpException(409, "You're not stocks below the threshold");

    return getResult;
  }

  public async createStock(stockData: CreatestockDto): Promise<Stock> {
    if (isEmpty(stockData)) throw new HttpException(400, 'id stock not found');
    try {
      const stockResponse: Stock = await StockEntity.create({ ...stockData }).save();
      return stockResponse;
    } catch (e) {
      throw e;
    }
  }

  public async updateStock(stockId: number, stockData: CreatestockDto): Promise<Stock> {
    if (isEmpty(stockData)) throw new HttpException(400, 'stocktId not found');

    const findStock: Stock = await StockEntity.findOne({ where: { id: stockId } });
    if (!findStock) throw new HttpException(409, 'stock not found');

    await StockEntity.update(stockId, { ...stockData });

    const updateStock: Stock = await StockEntity.findOne({ where: { id: stockId } });
    return updateStock;
  }

  public async deleteProduit(stockId: number): Promise<Stock> {
    //console.log(produitId);
    if (isEmpty(stockId)) throw new HttpException(400, 'stockId not found');

    const findStock: Stock = await StockEntity.findOne({ where: { id: stockId } });
    if (!findStock) throw new HttpException(409, 'stocktId not found');

    await StockEntity.delete({ id: stockId });
    return findStock;
  }
}
export default StockService;
