interface PaginationType {
    next?: string;
    previous?: string;
    count: number;
    totalPage: number;
    currentPage: number;
}

export interface PaginatedResponseType<T> {
    pagination: PaginationType;
    results: T[];
}