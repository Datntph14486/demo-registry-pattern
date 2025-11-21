import { Injectable } from '@nestjs/common';
import { IService } from '../interfaces';

@Injectable()
export class S8Service implements IService {
  key = 's8';

  constructor() {}

  public async execute(
    params: any,
    handlers: Record<string, IService>,
  ): Promise<number> {
    const s9 = await handlers['s9'].execute(params, handlers);
    const s10 = await handlers['s10'].execute(params, handlers);

    return s9 + s10;
  }
}
