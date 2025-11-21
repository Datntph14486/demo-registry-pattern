export interface IService {
  key: string;
  execute(params: any, handlers: Record<string, IService>): Promise<number>;
}

export interface IRegistryService {
  [key: string]: IService;
}
