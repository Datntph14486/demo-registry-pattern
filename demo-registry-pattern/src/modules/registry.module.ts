import { Module } from '@nestjs/common';
import { RegistryController } from './registry.controller';
import { RegistryService } from './services/registry.service';
import { S10Service } from './services/s10.service';
import { S9Service } from './services/s9.service';
import { S8Service } from './services/s8.service';
import { S7Service } from './services/s7.service';
import { S6Service } from './services/s6.service';
import { S5Service } from './services/s5.service';
import { S4Service } from './services/s4.service';
import { S3Service } from './services/s3.service';
import { S2Service } from './services/s2.service';
import { S1Service } from './services/s1.service';

@Module({
  imports: [],
  controllers: [RegistryController],
  providers: [
    RegistryService,
    S1Service,
    S2Service,
    S3Service,
    S4Service,
    S5Service,
    S6Service,
    S7Service,
    S8Service,
    S9Service,
    S10Service,
  ],
  exports: [
    RegistryService,
    S1Service,
    S2Service,
    S3Service,
    S4Service,
    S5Service,
    S6Service,
    S7Service,
    S8Service,
    S9Service,
    S10Service,
  ],
})
export class RegistryModule {}
