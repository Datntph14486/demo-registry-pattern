import { Injectable } from '@nestjs/common';
import { IService } from '../interfaces';

@Injectable()
export class S4Service implements IService {
  key = 's4';

  constructor() {}

  public async execute(
    _params: any,
    _handlers: Record<string, IService>,
  ): Promise<number> {
    return 20;
  }
}
