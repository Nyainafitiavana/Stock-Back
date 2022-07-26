/* eslint-disable prettier/prettier */
import { EntityRepository, Repository } from 'typeorm';
import { CreateCategoryDto } from '@dtos/category.dto';
import { CategoryEntity } from '@entities/category.entity';
import { HttpException } from '@exceptions/HttpException';
import { Category } from '@interfaces/category.interface';
import { isEmpty } from '@utils/util';

@EntityRepository()
class CategoryService extends Repository<CategoryEntity> {
  //find all category
  public async findAllCategory(limit: number, offset: number): Promise<Category[]> {
    const cats: Category[] = await CategoryEntity.find({take: limit, skip: offset});
    return cats;
  }

  public async findCategoryById(categoryId: number): Promise<Category[]> {
    if (isEmpty(categoryId)) throw new HttpException(400, "You're not categoryId");

    const findCategory: Category[] = await CategoryEntity.find({ where: { id: categoryId }, take: 1 });
    if (!findCategory) throw new HttpException(409, "You're not category");

    return findCategory;
  }

  public async createCategory(categoryData: CreateCategoryDto): Promise<Category> {
    if (isEmpty(categoryData)) throw new HttpException(400, "You're not category");

    const categoryResponse: Category = await CategoryEntity.create({ ...categoryData }).save();

    return categoryResponse;
  }

  public async updateCategory(categoryId: number, categoryData: CreateCategoryDto): Promise<Category> {
    if (isEmpty(categoryData)) throw new HttpException(400, "categoryId not found");

    const findCategory: Category = await CategoryEntity.findOne({ where: { id: categoryId } });
    if (!findCategory) throw new HttpException(409, "category not found");

  
    await CategoryEntity.update(categoryId, { ...categoryData });

    const updateCategory: Category = await CategoryEntity.findOne({ where: { id: categoryId } });
    return updateCategory;
  }


  public async deleteCategory(categoryId: number): Promise<Category> {
    //console.log(produitId);
    if (isEmpty(categoryId)) throw new HttpException(400, "categoryId not found");

    const findCategory: Category = await CategoryEntity.findOne({ where: { id: categoryId } });
    if (!findCategory) throw new HttpException(409, "produitId not found");

    await CategoryEntity.delete({ id: categoryId });
    return findCategory;
  }

}

export default CategoryService;
