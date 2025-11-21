import { Injectable } from '@nestjs/common';
import { IService } from '../interfaces';

@Injectable()
export class S10Service implements IService {
  key = 's10';

  constructor() {}

  public async execute(
    params: any,
    handlers: Record<string, IService>,
  ): Promise<number> {
    const s6 = await handlers['s6'].execute(params, handlers);
    const s9 = await handlers['s9'].execute(params, handlers);

    return s6 + s9;
  }
}
