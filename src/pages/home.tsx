import { useQuery } from 'react-query';
import { Pagination } from 'src/components/shared';

import { AsideFilter, SortProductList, Product } from 'src/features/product';
import { useQueryParams } from 'src/hooks';
import productService from 'src/services/product.service';

function HomePage() {
    const queryParams = useQueryParams();
    const { data } = useQuery({
        queryKey: ['products', queryParams],
        queryFn: () => {
            return productService.getProducts(queryParams);
        },
    });

    console.log(data);

    return (
        <div className="container">
            <div className="grid grid-cols-12 gap-6">
                <div className="col-span-3">
                    <AsideFilter />
                </div>
                <div className="col-span-9">
                    <SortProductList />
                    <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                        {data &&
                            data.data.data.products.map((product) => (
                                <div className="col-span-1" key={product._id}>
                                    <Product product={product} />
                                </div>
                            ))}
                    </div>
                    <Pagination />
                </div>
            </div>
        </div>
    );
}

export default HomePage;
