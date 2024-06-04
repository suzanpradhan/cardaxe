interface PaginationType {
    next?: string;
    previous?: string;
    count: number;
    total_pages: number;
    current_page: number;
}

export interface PaginatedResponseType<T> {
    pagination: PaginationType;
    results: T[];
}