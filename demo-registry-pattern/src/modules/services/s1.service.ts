import { Injectable } from '@nestjs/common';
import { IService } from '../interfaces';

@Injectable()
export class S1Service implements IService {
  key = 's1';

  constructor() {}

  public async execute(
    params: any,
    handlers: Record<string, IService>,
  ): Promise<number> {
    const s2 = await handlers['s2'].execute(params, handlers);
    const s3 = await handlers['s3'].execute(params, handlers);

    return s2 + s3;
  }
}
