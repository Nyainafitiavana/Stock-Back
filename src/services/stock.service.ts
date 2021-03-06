import { EntityRepository, Repository } from 'typeorm';
import { StockEntity } from '../entities/stock.entity';
import { Stock } from '../interfaces/stock.interface';
import { CreatestockDto } from '../dtos/stock.dto';
import { isEmpty } from '../utils/util';
import { HttpException } from '../exceptions/HttpException';

@EntityRepository()
class StockService extends Repository<StockEntity> {
  public async findAllStock(): Promise<Stock[]> {
    const stocks: Stock[] = await StockEntity.find({ relations: ['produit'] });
    return stocks;
  }

  //   public async findProduitById(produitId: number): Promise<Produit> {
  //     if (isEmpty(produitId)) throw new HttpException(400, "You're not produitId");

  //     const findProduit: Produit = await ProduitEntity.findOne({ where: { id: produitId }, relations: ['category'] });
  //     if (!findProduit) throw new HttpException(409, "You're not produit");

  //     return findProduit;
  //   }

  public async findStockById(stockId: number): Promise<Stock> {
    if (isEmpty(stockId)) throw new HttpException(400, 'stock id not found');

    const findStock: Stock = await StockEntity.findOne({ where: { id: stockId }, relations: ['produit'] });
    if (!findStock) throw new HttpException(409, "You're not produit");

    return findStock;
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

  public async updateProduit(stockId: number, stockData: CreatestockDto): Promise<Stock> {
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
