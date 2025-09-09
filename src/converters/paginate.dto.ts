export class PaginationMetaDto {
  current_page: number;
  from: number;
  to: number;
  total: number;
  per_page: number;
  last_page: number;

  constructor(current_page: number, total: number, per_page: number) {
    this.current_page = current_page;
    this.from = (current_page - 1) * per_page + 1;
    this.to = Math.min(current_page * per_page, total);
    this.per_page = per_page;
    this.last_page = Math.ceil(total / per_page);
    this.total = total;
  }
}

export class PaginationDto<T> {
  data: T[];
  meta: PaginationMetaDto | null;

  constructor(data: T[], meta: PaginationMetaDto) {
    this.data = data;
    this.meta = data.length > 0 ? meta : null;
  }
}
