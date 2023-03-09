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
    paginate: {
        page: number;
        limit: number;
        page_size: number;
    };
}

export interface ProductListConfig {
    page?: number;
    limit?: number;
    sort_by?: 'createAt' | 'view' | 'sold' | 'price';
    order?: 'asc' | 'desc';
    exclude?: string;
    rating_filter?: number;
    price_max?: number;
    price_min?: number;
    name?: string;
}
