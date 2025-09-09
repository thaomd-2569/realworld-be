export interface Converter<T, D> {
  toDto(entity: T): D;
  // toGenericListResponse(entities: T[]): D[];
  toGenericListResponse(
    entities: T[],
    pagination?: { total: number; page: number; perPage: number },
    filters?: Record<string, any>,
  ): any;
}
