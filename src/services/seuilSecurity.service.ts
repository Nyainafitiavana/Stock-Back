/* eslint-disable prettier/prettier */
import { EntityRepository, Repository } from 'typeorm';
import { HttpException } from '@exceptions/HttpException';
import { isEmpty } from '@utils/util';
import { SeuilSecurityEntity} from '@/entities/seuilSecurity.entity';
import { seuilSecurity } from '@/interfaces/seuilSecurity.interface';
import { CreateSeuilSecurityDto } from '@/dtos/seuilSecurity.dto';

@EntityRepository()
class SeuilSecurityService extends Repository<SeuilSecurityEntity> {
  public async findAllSeuilSecurity(): Promise<seuilSecurity[]> {
    const seuilS: seuilSecurity[] = await SeuilSecurityEntity.find();
    return seuilS;
  }

  public async createSeuilSecurity(seuilSecurityData: CreateSeuilSecurityDto): Promise<seuilSecurity> {
    if (isEmpty(seuilSecurityData)) throw new HttpException(400, "You're not security thresolde");

    const seuilSecurityResponse: seuilSecurity = await SeuilSecurityEntity.create({ ...seuilSecurityData }).save();

    return seuilSecurityResponse;
  }

  public async updateSeuilSecurity(seuilSecurityId: number, seuilSecurityData: CreateSeuilSecurityDto): Promise<seuilSecurity> {
    if (isEmpty(seuilSecurityId)) throw new HttpException(400, "categoryId not found");

    const getResult: seuilSecurity = await SeuilSecurityEntity.findOne({ where: { id: seuilSecurityId } });
    if (!getResult) throw new HttpException(409, "category not found");

  
    await SeuilSecurityEntity.update(seuilSecurityId, { ...seuilSecurityData });

    const updateSeuilSecurity: seuilSecurity = await SeuilSecurityEntity.findOne({ where: { id: seuilSecurityId } });
    return updateSeuilSecurity;
  }

  
  public async findSeuilById(): Promise<seuilSecurity> {
    const findSeuil: seuilSecurity = await SeuilSecurityEntity.findOne({ where: { id: 1 } });
    if (!findSeuil) throw new HttpException(409, "You're not security thresolde");

    return findSeuil;
  }
}

export default SeuilSecurityService;
