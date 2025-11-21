import { Injectable } from '@nestjs/common';
import { IService } from '../interfaces';

@Injectable()
export class S7Service implements IService {
  key = 's7';

  constructor() {}

  public async execute(
    params: any,
    handlers: Record<string, IService>,
  ): Promise<number> {
    const s5 = await handlers['s5'].execute(params, handlers);
    const s6 = await handlers['s6'].execute(params, handlers);

    return s5 + s6;
  }
}
