import { yupResolver } from '@hookform/resolvers/yup';
import classNames from 'classnames';
import omit from 'lodash/omit';
import { useForm } from 'react-hook-form';
import { createSearchParams, Link, useNavigate } from 'react-router-dom';

import { Button, InputField } from 'src/components/shared';
import { path } from 'src/constants';
import { useSchemaValidate } from 'src/hooks';
import { QueryConfig } from 'src/pages/home';
import { Category } from 'src/types/category.type';
import RatingStars from './RatingStars';

interface Props {
    queryConfig: QueryConfig;
    categories: Category[];
}

interface FormState {
    price_min: string;
    price_max: string;
}

const AsideFilter = ({ categories, queryConfig }: Props) => {
    const navigate = useNavigate();
    const { category: categoryId } = queryConfig;

    const schema = useSchemaValidate('priceMinMax');
    const { handleSubmit, control, reset } = useForm<FormState>({
        defaultValues: {
            price_min: '',
            price_max: '',
        },
        resolver: yupResolver(schema),
    });

    const handleFilterByPrice = (payload: FormState) => {
        navigate({
            pathname: path.home,
            search: createSearchParams({
                ...queryConfig,
                price_max: payload.price_max,
                price_min: payload.price_min,
            }).toString(),
        });
    };

    const handleRemoveAll = () => {
        reset();
        navigate({
            pathname: path.home,
            search: createSearchParams(
                omit(queryConfig, [
                    'price_min',
                    'price_max',
                    'rating_filter',
                    'category',
                ]),
            ).toString(),
        });
    };

    return (
        <div className="py-4">
            <Link to={path.home} className="flex items-center font-bold">
                <svg viewBox="0 0 12 10" className="mr-3 h-4 w-3 fill-current">
                    <g fillRule="evenodd" stroke="none" strokeWidth={1}>
                        <g transform="translate(-373 -208)">
                            <g transform="translate(155 191)">
                                <g transform="translate(218 17)">
                                    <path d="m0 2h2v-2h-2zm4 0h7.1519633v-2h-7.1519633z" />
                                    <path d="m0 6h2v-2h-2zm4 0h7.1519633v-2h-7.1519633z" />
                                    <path d="m0 10h2v-2h-2zm4 0h7.1519633v-2h-7.1519633z" />
                                </g>
                            </g>
                        </g>
                    </g>
                </svg>
                Tất cả danh mục
            </Link>
            <div className="my-4 h-[1px] bg-gray-300" />

            <ul>
                {categories.map((category) => (
                    <li
                        className="py-2 pl-2 hover:text-gray-500"
                        key={category._id}
                    >
                        <Link
                            to={{
                                pathname: path.home,
                                search: createSearchParams({
                                    ...queryConfig,
                                    category: category._id,
                                }).toString(),
                            }}
                            className={classNames('relative px-2', {
                                'font-semibold text-primary':
                                    categoryId === category._id,
                            })}
                        >
                            {categoryId === category._id && (
                                <svg
                                    viewBox="0 0 4 7"
                                    className="absolute top-1 left-[-10px] h-2 w-2 fill-current"
                                >
                                    <polygon points="4 3.5 0 0 0 7" />
                                </svg>
                            )}
                            {category.name}
                        </Link>
                    </li>
                ))}
            </ul>

            <Link
                to={path.home}
                className="mt-4 flex items-center font-bold uppercase"
            >
                <svg
                    enableBackground="new 0 0 15 15"
                    viewBox="0 0 15 15"
                    x={0}
                    y={0}
                    className="mr-3 h-4 w-3 fill-current stroke-current"
                >
                    <g>
                        <polyline
                            fill="none"
                            points="5.5 13.2 5.5 5.8 1.5 1.2 13.5 1.2 9.5 5.8 9.5 10.2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeMiterlimit={10}
                        />
                    </g>
                </svg>
                Bộ lọc tìm kiếm
            </Link>
            <div className="my-4 h-[1px] bg-gray-300" />

            <div className="my-5">
                <div>Khoản giá</div>
                <form
                    className="mt-2"
                    onSubmit={handleSubmit(handleFilterByPrice)}
                >
                    <div className="mb-2 flex items-start">
                        <InputField
                            type="text"
                            control={control}
                            className="grow"
                            name="price_min"
                            placeholder="₫ TỪ"
                            containerInputClassName="p-1 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm"
                            onlyNumber
                        />
                        <div className="mx-2 mt-2 shrink-0">-</div>
                        <InputField
                            type="text"
                            control={control}
                            className="grow"
                            name="price_max"
                            placeholder="₫ ĐẾN"
                            containerInputClassName="p-1 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm"
                            onlyNumber
                        />
                    </div>
                    <Button primary type="submit">
                        Áp dụng
                    </Button>
                </form>
            </div>
            <div className="my-4 h-[1px] bg-gray-300" />

            <div className="text-sm">Đánh giá</div>
            <RatingStars queryConfig={queryConfig} />
            <div className="my-4 h-[1px] bg-gray-300" />

            <Button primary onClick={handleRemoveAll}>
                Xóa tất cả
            </Button>
        </div>
    );
};

export default AsideFilter;
