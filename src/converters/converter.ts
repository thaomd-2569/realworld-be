export interface Converter<T, D> {
  toDto(entity: T): D;
  toGenericListResponse(entities: T[]): D[];
  toListWrapper(
    entities: T[],
    pagination?: { total: number; page: number; limit: number },
    filters?: Record<string, any>,
  ): any;
}
