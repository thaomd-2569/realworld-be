import { Expose } from "class-transformer";

export class ListResponseDto<T> {
    @Expose()
    data: T[];

    @Expose()
    pagination?: {
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    };

    @Expose()
    filters?: Record<string, any>;

    constructor(
        data: T[],
        pagination?: { total: number; page: number; limit: number },
        filters?: Record<string, any>
    ) {
        this.data = data;
        this.pagination = pagination ? {
            ...pagination,
            totalPages: Math.ceil(pagination.total / pagination.limit)
        } : undefined;
        this.filters = filters;
    }
}
