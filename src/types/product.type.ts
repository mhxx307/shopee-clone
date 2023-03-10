export interface Product {
    _id: string;
    name: string;
    price_before_discount: number;
    description: string;
    category: {
        _id: string;
        name: string;
    };
    images: string[];
    image: string;
    rating: number;
    quantity: number;
    sold: number;
    view: number;
    createAt: string;
    updateAt: string;
    price: number;
}

export interface ProductList {
    products: Product[];
    pagination: {
        page: number;
        limit: number;
        page_size: number;
    };
}

export interface ProductListConfig {
    page?: number | string;
    limit?: number | string;
    sort_by?: 'createAt' | 'view' | 'sold' | 'price';
    order?: 'asc' | 'desc';
    exclude?: string;
    rating_filter?: number | string;
    price_max?: number | string;
    price_min?: number | string;
    name?: string;
    category?: string;
}
