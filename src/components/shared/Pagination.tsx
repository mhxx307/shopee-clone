import classNames from 'classnames';
import { createSearchParams, Link } from 'react-router-dom';
import { path } from 'src/constants';
import { QueryConfig } from 'src/pages/home';

/**
Với range = 2 áp dụng cho khoảng cách đầu, cuối và xung quanh current_page
[1] 2 3 ... 19 20
1 [2] 3 4 ... 19 20 
1 2 [3] 4 5 ... 19 20
1 2 3 [4] 5 6 ... 19 20
1 2 3 4 [5] 6 7 ... 19 20
1 2 ... 4 5 [6] 8 9 ... 19 20
1 2 ...13 14 [15] 16 17 ... 19 20
1 2 ... 14 15 [16] 17 18 19 20
1 2 ... 15 16 [17] 18 19 20
1 2 ... 16 17 [18] 19 20
1 2 ... 17 18 [19] 20
1 2 ... 18 19 [20]
*/

interface PaginationProps {
    queryConfig: QueryConfig;
    pageSize: number;
}

const RANGE = 2;

function Pagination({ queryConfig, pageSize }: PaginationProps) {
    const page = Number(queryConfig.page);

    const renderPagination = () => {
        let dotAfter = false;
        let dotBefore = false;

        const renderDotBefore = (index: number) => {
            if (!dotBefore) {
                dotBefore = true;
                return (
                    <span
                        key={index}
                        className="flex-center mx-2 cursor-pointer rounded bg-white px-3 py-2 shadow-sm"
                    >
                        ...
                    </span>
                );
            }
            return null;
        };

        const renderDotAfter = (index: number) => {
            if (!dotAfter) {
                dotAfter = true;
                return (
                    <span
                        key={index}
                        className="flex-center mx-2 cursor-pointer rounded bg-white px-3 py-2 shadow-sm"
                    >
                        ...
                    </span>
                );
            }
            return null;
        };

        return Array(pageSize)
            .fill(0)
            .map((_, index) => {
                const pageNumber = index + 1;
                if (
                    page <= RANGE * 2 + 1 &&
                    pageNumber > page + RANGE &&
                    pageNumber < pageSize - RANGE + 1
                ) {
                    return renderDotAfter(index);
                } else if (
                    page > RANGE * 2 + 1 &&
                    page < pageSize - RANGE * 2
                ) {
                    if (pageNumber < page - RANGE && pageNumber > RANGE) {
                        return renderDotBefore(index);
                    } else if (
                        pageNumber > page + RANGE &&
                        pageNumber < pageSize - RANGE + 1
                    ) {
                        return renderDotAfter(index);
                    }
                } else if (
                    page >= pageSize - RANGE * 2 &&
                    pageNumber > RANGE &&
                    pageNumber < page - RANGE
                ) {
                    return renderDotBefore(index);
                }

                return (
                    <Link
                        key={index}
                        className={classNames(
                            'flex-center mx-2 cursor-pointer rounded border bg-white px-3 py-2 shadow-sm',
                            {
                                'border-cyan-500': pageNumber === page,
                                'border-transparent': pageNumber !== page,
                            },
                        )}
                        to={{
                            pathname: path.home,
                            search: createSearchParams({
                                ...queryConfig,
                                page: pageNumber.toString(),
                            }).toString(),
                        }}
                    >
                        {pageNumber}
                    </Link>
                );
            });
    };

    return (
        <div className="mt-6 flex flex-wrap justify-center">
            {page === 1 ? (
                <span className="flex-center mx-2 cursor-not-allowed rounded border bg-gray-100 px-3 py-2 shadow-sm">
                    Prev
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
                    className="flex-center mx-2 cursor-pointer rounded border bg-white px-3 py-2 shadow-sm"
                >
                    Prev
                </Link>
            )}

            {renderPagination()}

            {page === pageSize ? (
                <span className="flex-center mx-2 cursor-not-allowed rounded border bg-gray-100 px-3 py-2 shadow-sm">
                    Next
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
                    className="flex-center mx-2 cursor-pointer rounded border bg-white px-3 py-2 shadow-sm"
                >
                    Next
                </Link>
            )}
        </div>
    );
}

export default Pagination;
