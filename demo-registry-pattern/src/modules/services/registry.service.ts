import { Injectable, NotFoundException } from '@nestjs/common';
import { S1Service } from './s1.service';
import { S2Service } from './s2.service';
import { S3Service } from './s3.service';
import { S4Service } from './s4.service';
import { S5Service } from './s5.service';
import { S6Service } from './s6.service';
import { S7Service } from './s7.service';
import { S8Service } from './s8.service';
import { S9Service } from './s9.service';
import { S10Service } from './s10.service';
import { IService } from '../interfaces';

@Injectable()
export class RegistryService {
  private readonly handlers: Record<string, IService> = {};

  constructor(
    private readonly s1Service: S1Service,
    private readonly s2Service: S2Service,
    private readonly s3Service: S3Service,
    private readonly s4Service: S4Service,
    private readonly s5Service: S5Service,
    private readonly s6Service: S6Service,
    private readonly s7Service: S7Service,
    private readonly s8Service: S8Service,
    private readonly s9Service: S9Service,
    private readonly s10Service: S10Service,
  ) {
    [
      s1Service,
      s2Service,
      s3Service,
      s4Service,
      s5Service,
      s6Service,
      s7Service,
      s8Service,
      s9Service,
      s10Service,
    ].forEach((service) => {
      this.handlers[service.key] = service as IService;
    });
  }

  async execute(key: string, params: any): Promise<number> {
    const service = this.handlers[key];

    if (!service) {
      throw new NotFoundException(`Service not found for key: ${key}`);
    }

    return await service.execute(params, this.handlers);
  }
}
