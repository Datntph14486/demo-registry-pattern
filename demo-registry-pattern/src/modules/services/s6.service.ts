import { Injectable } from '@nestjs/common';
import { IService } from '../interfaces';

@Injectable()
export class S6Service implements IService {
  key = 's6';

  constructor() {}

  public async execute(
    _params: any,
    _handlers: Record<string, IService>,
  ): Promise<number> {
    return 30;
  }
}
