import { Injectable } from '@nestjs/common';
import { IService } from '../interfaces';

@Injectable()
export class S9Service implements IService {
  key = 's9';

  constructor() {}

  public async execute(
    params: any,
    handlers: Record<string, IService>,
  ): Promise<number> {
    const s5 = await handlers['s5'].execute(params, handlers);
    const s7 = await handlers['s7'].execute(params, handlers);

    return s5 + s7;
  }
}
