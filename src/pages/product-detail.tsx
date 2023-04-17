import DOMPurify from 'dompurify';
import { useEffect, useMemo, useRef, useState } from 'react';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import { Button, QuantityController } from 'src/components/shared';
import { purchasesStatus } from 'src/constants/purchase';
import { useAppContext } from 'src/contexts/app.context';
import { Product, ProductRating } from 'src/features/product';
import { productService, purchaseService } from 'src/services';
import {
    Product as ProductType,
    ProductListConfig,
} from 'src/types/product.type';
import {
    formatCurrency,
    formatNumberToSocialStyle,
    getIdFromNameId,
    rateSale,
} from 'src/utils';

function ProductDetailPage() {
    const navigate = useNavigate();
    const { isAuthenticated } = useAppContext();
    const [buyCount, setBuyCount] = useState(1);
    const { nameId } = useParams();
    const id = getIdFromNameId(nameId as string);
    const queryClient = useQueryClient();
    const { data: productData } = useQuery({
        queryKey: ['product', id],
        queryFn: () => {
            return productService.getProductDetail(id);
        },
        keepPreviousData: true,
    });
    const product = productData?.data.data;

    const queryConfig: ProductListConfig = {
        limit: '20',
        page: '1',
        category: product?.category._id,
    };

    const { data: productsData } = useQuery({
        queryKey: ['products', queryConfig],
        queryFn: () => {
            return productService.getProducts(queryConfig);
        },
        keepPreviousData: true,
        staleTime: 3 * 60 * 1000, // 3 minutes
        enabled: Boolean(product),
    });

    const addToCartMutation = useMutation(purchaseService.addToCart);

    const imageRef = useRef<HTMLImageElement>(null);

    // lấy 5 ảnh từ 0 1 2 3 4 => cắt qua slice sẽ không lấy số cuối nên phải để 5
    const [currentImagesIndex, setCurrentImagesIndex] = useState([0, 5]);
    const [activeImage, setActiveImage] = useState('');

    const currentImages = useMemo(() => {
        return product ? product.images.slice(...currentImagesIndex) : [];
    }, [product, currentImagesIndex]);

    useEffect(() => {
        if (product) {
            setActiveImage(product.images[0]);
        }
    }, [product]);

    const prev = () => {
        if (currentImagesIndex[0] > 0) {
            setCurrentImagesIndex((prev) => [prev[0] - 1, prev[1] - 1]);
        }
    };

    const next = () => {
        if (currentImagesIndex[1] < (product as ProductType).images.length) {
            setCurrentImagesIndex((prev) => [prev[0] + 1, prev[1] + 1]);
        }
    };

    const handleChooseImage = (img: string) => {
        setActiveImage(img);
    };

    const handleZoom = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        const image = imageRef.current as HTMLImageElement;
        const rect = e.currentTarget.getBoundingClientRect();

        const { naturalHeight, naturalWidth } = image;
        const width = naturalHeight;
        const height = naturalWidth;

        const { offsetX, offsetY } = e.nativeEvent;
        const top = offsetY * (1 - naturalHeight / rect.height);
        const left = offsetX * (1 - naturalWidth / rect.width);

        // c2: lấy offsetX, offsetY không cần xử lý bubble event
        // const offsetX = e.pageX - (rect.x + window.scrollX);
        // const offsetY = e.pageY - (rect.y + window.scrollY);

        image.style.width = `${width}px`;
        image.style.height = `${height}px`;
        image.style.maxWidth = 'unset';
        image.style.top = `${top}px`;
        image.style.left = `${left}px`;
    };

    const handleRemoveZoom = () => {
        const image = imageRef.current as HTMLImageElement;
        image.removeAttribute('style');
    };

    const handleBuyCount = (count: number) => {
        setBuyCount(count);
    };

    const handleAddToCart = () => {
        if (isAuthenticated) {
            addToCartMutation.mutate(
                {
                    product_id: product?._id as string,
                    buy_count: buyCount,
                },
                {
                    onSuccess: (data) => {
                        toast.success(data.data.message, {
                            toastId: data.data.message,
                        });
                        queryClient.invalidateQueries({
                            queryKey: ['purchase', purchasesStatus.inCart],
                        });
                    },
                },
            );
        } else {
            toast.error('Bạn cần đăng nhập để thực hiện thao tác này', {
                toastId: 'Bạn cần đăng nhập để thực hiện thao tác này',
            });
        }
    };

    const handleBuyNow = async (e: any) => {
        e.preventDefault();
        const response = await purchaseService.addToCart({
            product_id: product?._id as string,
            buy_count: buyCount,
        });
        navigate(
            { pathname: '/cart' },
            { state: { purchaseId: response.data.data._id } },
        );
    };

    if (!product) {
        return <div>Loading...</div>;
    }

    return (
        <div className="bg-gray-200 py-6">
            <div className="container">
                <div className="bg-white p-4 shadow">
                    <div className="grid grid-cols-12 gap-9">
                        <div className="col-span-5">
                            <div
                                className="relative w-full cursor-zoom-in overflow-hidden pt-[100%] shadow"
                                onMouseMove={handleZoom}
                                onMouseLeave={handleRemoveZoom}
                            >
                                <img
                                    src={activeImage}
                                    alt={product.name}
                                    ref={imageRef}
                                    className="pointer-events-none absolute top-0 left-0 h-full w-full bg-white object-cover"
                                />
                            </div>
                            <div className="relative mt-4 grid grid-cols-5 gap-1">
                                <button
                                    className="absolute left-0 top-1/2 z-10 h-9 w-5 -translate-y-1/2 bg-black/20 text-white"
                                    onClick={prev}
                                >
                                    <BsChevronLeft />
                                </button>
                                {currentImages.map((img) => {
                                    const isActive = img === activeImage;
                                    return (
                                        <div
                                            className="relative w-full pt-[100%]"
                                            key={img}
                                            onMouseEnter={() =>
                                                handleChooseImage(img)
                                            }
                                            aria-hidden="true"
                                            role="button"
                                            tabIndex={0}
                                        >
                                            <img
                                                src={img}
                                                alt={product.name}
                                                className="absolute top-0 left-0 h-full w-full cursor-pointer bg-white object-cover"
                                            />
                                            {isActive && (
                                                <div className="absolute inset-0 border-2 border-primary" />
                                            )}
                                        </div>
                                    );
                                })}
                                <button
                                    className="absolute right-0 top-1/2 z-10 h-9 w-5 -translate-y-1/2 bg-black/20 text-white"
                                    onClick={next}
                                >
                                    <BsChevronRight />
                                </button>
                            </div>
                        </div>
                        <div className="col-span-7">
                            <h1 className="text-xl font-medium uppercase">
                                {product.name}
                            </h1>
                            <div className="mt-8 flex items-center">
                                <div className="flex items-center">
                                    <span className="mr-1 border-b border-b-primary text-primary">
                                        {product.rating}
                                    </span>
                                    <ProductRating
                                        rating={product.rating}
                                        activeClassName="h-5 w-5 fill-primary text-primary"
                                        nonActiveClassName="h-5 w-5 fill-current text-gray-300"
                                    />
                                </div>
                                <div className="mx-4 h-4 w-[1px] bg-gray-300"></div>
                                <div>
                                    <span>
                                        {formatNumberToSocialStyle(
                                            product.sold,
                                        )}
                                    </span>
                                    <span className="ml-1 text-gray-500">
                                        Đã bán
                                    </span>
                                </div>
                            </div>
                            <div className="mt-8 flex items-center bg-gray-50 px-5 py-4">
                                <div className="text-gray-500 line-through">
                                    ₫
                                    {formatCurrency(
                                        product.price_before_discount,
                                    )}
                                </div>
                                <div className="ml-3 text-3xl font-medium text-primary">
                                    ₫{formatCurrency(product.price)}
                                </div>
                                <div className="ml-4 rounded-sm bg-primary px-1 py-[2px] text-xs font-semibold uppercase text-white">
                                    {rateSale(
                                        product.price_before_discount,
                                        product.price,
                                    )}{' '}
                                    giảm
                                </div>
                            </div>
                            <div className="mt-8 flex items-center">
                                <div className="capitalize text-gray-500">
                                    Số lượng
                                </div>
                                <QuantityController
                                    onDecrease={handleBuyCount}
                                    onIncrease={handleBuyCount}
                                    onType={handleBuyCount}
                                    value={buyCount}
                                    max={product.quantity}
                                />
                                <div className="ml-6 text-sm text-gray-500">
                                    {product.quantity} sản phẩm có sẵn
                                </div>
                            </div>
                            <div className="mt-8 flex items-center space-x-4">
                                <Button
                                    primary
                                    outline
                                    LeftIcon={AiOutlineShoppingCart}
                                    onClick={handleAddToCart}
                                >
                                    Thêm vào giỏ hàng
                                </Button>
                                <Button primary onClick={handleBuyNow}>
                                    Mua ngay
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="mt-8 bg-white p-4 shadow">
                    <div className="rounded bg-gray-50 p-4 text-lg capitalize text-slate-700">
                        Mô tả sản phẩm
                    </div>
                    <div className="mx-4 mt-12 mb-4 text-sm leading-loose">
                        <div
                            dangerouslySetInnerHTML={{
                                __html: DOMPurify.sanitize(product.description), // * DOMPurify để loại bỏ các đoạn mã js
                            }}
                        />
                    </div>
                </div>
            </div>

            <div className="mt-6">
                <div className="container">
                    <h3 className="uppercase text-gray-400">
                        Sản phẩm tương tự
                    </h3>
                    <div className="mt-6 grid grid-cols-3 gap-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
                        {productsData &&
                            productsData.data.data.products.map((product) => (
                                <div className="col-span-1" key={product._id}>
                                    <Product product={product} />
                                </div>
                            ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductDetailPage;
