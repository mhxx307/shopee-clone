import { isUndefined, omitBy } from 'lodash';
import { useQuery } from 'react-query';

import { Pagination } from 'src/components/shared';
import { AsideFilter, SortProductList, Product } from 'src/features/product';
import { useQueryParams } from 'src/hooks';
import productService from 'src/services/product.service';
import { ProductListConfig } from 'src/types/product.type';

export type QueryConfig = {
    [key in keyof ProductListConfig]: string;
};

function HomePage() {
    const queryParams: QueryConfig = useQueryParams();
    const queryConfig: QueryConfig = omitBy(
        {
            page: queryParams.page || '1',
            limit: queryParams.limit,
            sort_by: queryParams.sort_by,
            order_by: queryParams.order_by,
            exclude: queryParams.exclude,
            name: queryParams.name,
            price_max: queryParams.price_max,
            price_min: queryParams.price_min,
            rating_filter: queryParams.rating_filter,
        },
        isUndefined,
    );

    const { data } = useQuery({
        queryKey: ['products', queryConfig],
        queryFn: () => {
            return productService.getProducts(queryConfig as ProductListConfig);
        },
        keepPreviousData: true,
    });

    return (
        <div className="container">
            {data && (
                <div className="grid grid-cols-12 gap-6">
                    <div className="col-span-3">
                        <AsideFilter />
                    </div>
                    <div className="col-span-9">
                        <SortProductList />
                        <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                            {data &&
                                data.data.data.products.map((product) => (
                                    <div
                                        className="col-span-1"
                                        key={product._id}
                                    >
                                        <Product product={product} />
                                    </div>
                                ))}
                        </div>
                        <Pagination
                            queryConfig={queryConfig}
                            pageSize={data.data.data.pagination.page_size}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}

export default HomePage;
