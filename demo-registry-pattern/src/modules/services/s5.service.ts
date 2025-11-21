import { Injectable } from '@nestjs/common';
import { IService } from '../interfaces';

@Injectable()
export class S5Service implements IService {
  key = 's5';

  constructor() {}

  public async execute(
    params: any,
    handlers: Record<string, IService>,
  ): Promise<number> {
    const s3 = await handlers['s3'].execute(params, handlers);
    const s4 = await handlers['s4'].execute(params, handlers);

    return s3 + s4;
  }
}
