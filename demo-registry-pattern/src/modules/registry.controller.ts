import { Controller, Get, Query } from '@nestjs/common';
import { RegistryService } from './services/registry.service';

@Controller('registry')
export class RegistryController {
  constructor(private readonly registryService: RegistryService) {}

  @Get('execute')
  async execute(@Query('key') key: string, @Query('params') params: any) {
    return this.registryService.execute(key, params);
  }
}
