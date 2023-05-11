import classNames from 'classnames';
import omit from 'lodash/omit';
import { createSearchParams, Link, useNavigate } from 'react-router-dom';
import { FaChevronRight, FaChevronLeft } from 'react-icons/fa';

import { path, productOrderBy, productSortBy } from 'src/constants';
import { QueryConfig } from 'src/pages/home';
import { ProductListConfig } from 'src/types/product.type';

interface PaginationProps {
    queryConfig: QueryConfig;
    pageSize: number;
}

const SortProductList = ({ queryConfig, pageSize }: PaginationProps) => {
    const page = Number(queryConfig.page);
    const navigate = useNavigate();
    const { sort_by = productSortBy.createAt, order } = queryConfig;

    const isActiveSortBy = (
        sortByValue: Exclude<ProductListConfig['sort_by'], undefined>,
    ) => {
        return sort_by === sortByValue;
    };

    const handleSort = (
        sortByValue: Exclude<ProductListConfig['sort_by'], undefined>,
    ) => {
        navigate({
            pathname: path.home,
            search: createSearchParams(
                omit(
                    {
                        ...queryConfig,
                        sort_by: sortByValue,
                    },
                    ['order'],
                ),
            ).toString(),
        });
    };

    const handlePriceOrder = (
        orderValue: Exclude<ProductListConfig['order'], undefined>,
    ) => {
        navigate({
            pathname: path.home,
            search: createSearchParams({
                ...queryConfig,
                sort_by: productSortBy.price,
                order: orderValue,
            }).toString(),
        });
    };

    return (
        <div className="bg-gray-300/40 py-4 px-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex flex-wrap items-center gap-2">
                    <div>Sắp xếp theo</div>
                    <button
                        className={classNames(
                            'h-8 px-4 text-center text-sm capitalize ',
                            {
                                'bg-primary text-white hover:bg-primary/80':
                                    isActiveSortBy(productSortBy.view),
                            },
                            {
                                'bg-white text-black hover:bg-slate-100':
                                    !isActiveSortBy(productSortBy.view),
                            },
                        )}
                        onClick={() => handleSort(productSortBy.view)}
                    >
                        Phổ biến
                    </button>
                    <button
                        className={classNames(
                            'h-8 px-4 text-center text-sm capitalize ',
                            {
                                'bg-primary text-white hover:bg-primary/80':
                                    isActiveSortBy(productSortBy.createAt),
                            },
                            {
                                'bg-white text-black hover:bg-slate-100':
                                    !isActiveSortBy(productSortBy.createAt),
                            },
                        )}
                        onClick={() => handleSort(productSortBy.createAt)}
                    >
                        Mới nhất
                    </button>
                    <button
                        className={classNames(
                            'h-8 px-4 text-center text-sm capitalize ',
                            {
                                'bg-primary text-white hover:bg-primary/80':
                                    isActiveSortBy(productSortBy.sold),
                            },
                            {
                                'bg-white text-black hover:bg-slate-100':
                                    !isActiveSortBy(productSortBy.sold),
                            },
                        )}
                        onClick={() => handleSort(productSortBy.sold)}
                    >
                        Bán chạy
                    </button>
                    <select
                        className={classNames(
                            'h-8 px-4 text-left text-sm capitalize text-black outline-none ',
                            {
                                'bg-primary text-white hover:bg-primary/80':
                                    isActiveSortBy(productSortBy.price),
                            },
                            {
                                'bg-white text-black hover:bg-slate-100':
                                    !isActiveSortBy(productSortBy.price),
                            },
                        )}
                        value={order || ''}
                        onChange={(e) =>
                            handlePriceOrder(
                                e.target.value as Exclude<
                                    ProductListConfig['order'],
                                    undefined
                                >,
                            )
                        }
                    >
                        <option
                            value=""
                            disabled
                            className="bg-white text-black"
                        >
                            Giá
                        </option>
                        <option
                            value={productOrderBy.asc}
                            className="bg-white text-black"
                        >
                            Giá: Thấp đến cao
                        </option>
                        <option
                            value={productOrderBy.desc}
                            className="bg-white text-black"
                        >
                            Giá: Cao đến thấp
                        </option>
                    </select>
                </div>

                <div className="flex items-center">
                    <div>
                        <span className="text-primary">{page}</span>
                        <span>/{pageSize}</span>
                    </div>
                    <div className="flex-center ml-2">
                        {page === 1 ? (
                            <span className="flex-center h-8 cursor-not-allowed rounded-tl-sm rounded-bl-sm bg-white/60 px-3 shadow hover:bg-slate-100">
                                <FaChevronLeft className="text-gray-300" />
                            </span>
                        ) : (
                            <Link
                                to={{
                                    pathname: path.home,
                                    search: createSearchParams({
                                        ...queryConfig,
                                        page: (page - 1).toString(),
                                    }).toString(),
                                }}
                                className="flex-center h-8 cursor-pointer rounded-tl-sm rounded-bl-sm bg-white/60 px-3 shadow hover:bg-slate-100"
                            >
                                <FaChevronLeft />
                            </Link>
                        )}

                        {page === pageSize ? (
                            <span className="flex-center h-8 cursor-not-allowed rounded-tl-sm rounded-bl-sm bg-white/60 px-3 shadow hover:bg-slate-100">
                                <FaChevronRight className="text-gray-300" />
                            </span>
                        ) : (
                            <Link
                                to={{
                                    pathname: path.home,
                                    search: createSearchParams({
                                        ...queryConfig,
                                        page: (page + 1).toString(),
                                    }).toString(),
                                }}
                                className="flex-center h-8 cursor-pointer rounded-tl-sm rounded-bl-sm bg-white/60 px-3 shadow hover:bg-slate-100"
                            >
                                <FaChevronRight />
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SortProductList;
