import { Product } from './product.type';

export type purchasesStatus = -1 | 1 | 2 | 3 | 4 | 5;

export type PurchaseListStatus = purchasesStatus | 0;

export interface Purchase {
    _id: string;
    product: Product;
    price: number;
    price_before_discount: number;
    buy_count: number;
    createdAt: string;
    updatedAt: string;
    user: string;
    status: purchasesStatus;
}

export interface ExtendedPurchases extends Purchase {
    disable: boolean;
    checked: boolean;
}
