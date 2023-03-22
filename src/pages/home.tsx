import { useQuery } from 'react-query';

import { Pagination } from 'src/components/shared';
import { AsideFilter, SortProductList, Product } from 'src/features/product';
import { useQueryConfig } from 'src/hooks';
import { categoryService, productService } from 'src/services';
import { ProductListConfig } from 'src/types/product.type';

export type QueryConfig = {
    [key in keyof ProductListConfig]: string;
};

function HomePage() {
    const queryConfig = useQueryConfig();

    const { data: productsData } = useQuery({
        queryKey: ['products', queryConfig],
        queryFn: () => {
            return productService.getProducts(queryConfig as ProductListConfig);
        },
        keepPreviousData: true,
        staleTime: 3 * 60 * 1000, // 3 minutes
    });

    const { data: categoriesData } = useQuery({
        queryKey: ['categories', queryConfig],
        queryFn: () => {
            return categoryService.getCategories();
        },
        keepPreviousData: true,
    });

    return (
        <div className="container pb-4">
            {productsData && (
                <div className="grid grid-cols-12 gap-6">
                    <div className="col-span-3">
                        <AsideFilter
                            categories={categoriesData?.data.data || []}
                            queryConfig={queryConfig}
                        />
                    </div>
                    <div className="col-span-9">
                        <SortProductList
                            queryConfig={queryConfig}
                            pageSize={
                                productsData.data.data.pagination.page_size
                            }
                        />
                        <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                            {productsData &&
                                productsData.data.data.products.map(
                                    (product) => (
                                        <div
                                            className="col-span-1"
                                            key={product._id}
                                        >
                                            <Product product={product} />
                                        </div>
                                    ),
                                )}
                        </div>
                        <Pagination
                            queryConfig={queryConfig}
                            pageSize={
                                productsData.data.data.pagination.page_size
                            }
                        />
                    </div>
                </div>
            )}
        </div>
    );
}

export default HomePage;
