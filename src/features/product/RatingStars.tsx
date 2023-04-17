import { AiFillStar } from 'react-icons/ai';
import { createSearchParams, useNavigate } from 'react-router-dom';
import { path } from 'src/constants';
import { QueryConfig } from 'src/pages/home';

/**
 * index 0: Có 5 cái màu vàng tương ứng từ indexStar 0 - 4 đều màu vang
 * index 1: Có 4 cái màu vàng tương ứng từ indexStar 0 - 3 đều màu vang
 * index 2: Có 3 cái màu vàng tương ứng từ indexStar 0 - 2 đều màu vang
 * index 3: Có 2 cái màu vàng tương ứng từ indexStar 0 - 1 đều màu vang
 * index 4: Có 1 cái màu vàng tương ứng indexStar 0 đều màu vang
 *
 * Chúng ta nhận ra là indexStar < 5 - index => màu vàng
 */

interface Props {
    queryConfig: QueryConfig;
}

function RatingStars({ queryConfig }: Props) {
    const navigate = useNavigate();

    const handleFilterStar = (ratingFilter: number) => {
        navigate({
            pathname: path.home,
            search: createSearchParams({
                ...queryConfig,
                rating_filter: String(ratingFilter),
            }).toString(),
        });
    };

    return (
        <ul className="my-3">
            {Array(5)
                .fill(0)
                .map((_, index) => (
                    <li className="py-1 pl-2" key={index}>
                        <div
                            className="flex items-center text-sm"
                            onClick={() => handleFilterStar(5 - index)}
                            aria-hidden={true}
                            tabIndex={0}
                            role="button"
                        >
                            {Array(5)
                                .fill(0)
                                .map((_, indexStar) => {
                                    if (indexStar < 5 - index) {
                                        return (
                                            <AiFillStar
                                                key={indexStar}
                                                className="h-5 w-5 fill-yellow-400"
                                            />
                                        );
                                    }
                                    return (
                                        <AiFillStar
                                            key={indexStar}
                                            className="h-5 w-5 fill-gray-300"
                                        />
                                    );
                                })}
                            {index !== 0 && <span>Trở lên</span>}
                        </div>
                    </li>
                ))}
        </ul>
    );
}

export default RatingStars;
