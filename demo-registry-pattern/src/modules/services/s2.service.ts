import { Injectable } from '@nestjs/common';
import { IService } from '../interfaces';

@Injectable()
export class S2Service implements IService {
  key = 's2';

  constructor() {}

  public async execute(
    params: any,
    handlers: Record<string, IService>,
  ): Promise<number> {
    const s4 = await handlers['s4'].execute(params, handlers);
    const s5 = await handlers['s5'].execute(params, handlers);

    return s4 + s5;
  }
}
