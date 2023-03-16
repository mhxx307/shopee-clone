import { Purchase, PurchaseListStatus } from 'src/types/purchase.type';
import { SuccessResponseApi } from 'src/types/util.type.ts';
import httpRequest from 'src/utils/http';

const URL = 'purchases';

const purchaseService = {
    addToCart: (body: { product_id: string; buy_count: number }) => {
        return httpRequest.post<SuccessResponseApi<Purchase>>(
            `${URL}/add-to-cart`,
            {
                body,
            },
        );
    },
    getPurchases: (params: { status: PurchaseListStatus }) => {
        return httpRequest.get<SuccessResponseApi<Purchase[]>>(URL, {
            params,
        });
    },
};

export default purchaseService;
