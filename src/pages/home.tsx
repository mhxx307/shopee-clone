import AsideFilter from 'src/components/features/product/AsideFilter';
import Product from 'src/components/features/product/Product';
import SortProductList from 'src/components/features/product/SortProductList';

function HomePage() {
    return (
        <div className="container">
            <div className="grid grid-cols-12 gap-6">
                <div className="col-span-3">
                    <AsideFilter />
                </div>
                <div className="col-span-9">
                    <SortProductList />
                    <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                        <div className="col-span-1">
                            <Product />
                        </div>
                        <div className="col-span-1">
                            <Product />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HomePage;
