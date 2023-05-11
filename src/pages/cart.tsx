// eslint-disable-next-line import/no-named-as-default
import produce from 'immer';
import keyBy from 'lodash/keyBy';
import { Fragment, useEffect, useMemo } from 'react';
import { useMutation, useQuery } from 'react-query';
import { Link, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Button, QuantityController } from 'src/components/shared';
import { path } from 'src/constants';
import { purchasesStatus } from 'src/constants/purchase';
import { useAppContext } from 'src/contexts/app.context';
import { purchaseService } from 'src/services';
import { Purchase } from 'src/types/purchase.type';
import { formatCurrency, generateNameId } from 'src/utils';
import noproduct from 'src/assets/images/no-product.png';

export default function Cart() {
    const location = useLocation();
    const { data: purchasesInCartData, refetch } = useQuery({
        queryKey: ['purchases', { status: purchasesStatus.inCart }],
        queryFn: () =>
            purchaseService.getPurchases({ status: purchasesStatus.inCart }),
    });
    const { extendedPurchases, setExtendedPurchases } = useAppContext();
    const updatePurchasesMutation = useMutation({
        mutationFn: purchaseService.updatePurchase,
        onSuccess: () => {
            refetch();
        },
    });
    const buyProductsMutation = useMutation({
        mutationFn: purchaseService.buyProducts,
        onSuccess: () => {
            refetch();
        },
    });
    const deletePurchaseMutation = useMutation({
        mutationFn: purchaseService.deletePurchase,
        onSuccess: () => {
            refetch();
        },
    });

    const purchasesInCart = purchasesInCartData?.data.data;
    const isAllChecked = useMemo(
        () =>
            extendedPurchases.length > 0
                ? extendedPurchases.every((purchase) => purchase.checked)
                : false,
        [extendedPurchases],
    );
    const checkedPurchases = useMemo(
        () => extendedPurchases.filter((purchase) => purchase.checked),
        [extendedPurchases],
    );
    const checkedPurchasesCount = checkedPurchases.length;
    const totalPrice = useMemo(() => {
        return checkedPurchases.reduce((total, current) => {
            return total + current.buy_count * current.product.price;
        }, 0);
    }, [checkedPurchases]);
    const totalPriceSale = useMemo(() => {
        return checkedPurchases.reduce((total, current) => {
            return (
                total +
                current.buy_count *
                    (current.product.price_before_discount -
                        current.product.price)
            );
        }, 0);
    }, [checkedPurchases]);
    const purchaseIdInLocation =
        (location.state as { purchaseId: string } | null)?.purchaseId || null;

    useEffect(() => {
        setExtendedPurchases((prev) => {
            const extendPurchasesObject = keyBy(prev, '_id');
            return (
                purchasesInCart?.map((purchase) => {
                    const isPurchaseInLocation =
                        purchaseIdInLocation === purchase._id;
                    return {
                        ...purchase,
                        disable: false,
                        checked:
                            isPurchaseInLocation ||
                            Boolean(
                                extendPurchasesObject[purchase._id]?.checked,
                            ),
                    };
                }) || []
            );
        });
    }, [purchasesInCart, purchaseIdInLocation, setExtendedPurchases]);

    useEffect(() => {
        return () => {
            history.replaceState(null, '');
        };
    }, []);

    const handleChecked =
        (index: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
            setExtendedPurchases(
                produce((draft) => {
                    draft[index].checked = e.target.checked;
                }),
            );
        };

    const handleAllChecked = () => {
        setExtendedPurchases((prev) => {
            return prev.map((purchase) => {
                return {
                    ...purchase,
                    checked: !isAllChecked,
                };
            });
        });
    };

    const handleQuantityChange = (
        purchaseIndex: number,
        value: number,
        enable: boolean,
    ) => {
        if (enable) {
            const purchase = extendedPurchases[purchaseIndex];
            setExtendedPurchases(
                produce((draft) => {
                    draft[purchaseIndex].disable = true;
                }),
            );
            updatePurchasesMutation.mutate({
                product_id: purchase.product._id,
                buy_count: value,
            });
        }
    };

    const handleTypeQuantity = (purchaseIndex: number) => (value: number) => {
        setExtendedPurchases(
            produce((draft) => {
                draft[purchaseIndex].buy_count = value;
            }),
        );
    };

    const handleDeletePurchase = (purchaseIndex: number) => () => {
        const purchase = extendedPurchases[purchaseIndex];
        deletePurchaseMutation.mutate([purchase._id]);
    };

    const handleDeleteManyPurchase = () => {
        const purchaseIds = checkedPurchases.map((purchase) => purchase._id);
        deletePurchaseMutation.mutate(purchaseIds);
    };

    const handleBuyProduct = () => {
        if (checkedPurchasesCount > 0) {
            const body = checkedPurchases.map((purchase) => ({
                product_id: purchase.product._id,
                buy_count: purchase.buy_count,
            }));
            buyProductsMutation.mutate(body, {
                onSuccess(data) {
                    toast.success(data.data.message, {
                        toastId: data.data.message,
                    });
                },
            });
        }
    };

    return (
        <div className="bg-neutral-100 py-16">
            <div className="container">
                {extendedPurchases.length > 0 ? (
                    <Fragment>
                        <div className="overflow-auto">
                            <div className="min-w-[1000px]">
                                <div className="grid grid-cols-12 rounded-sm bg-white py-5 px-9 text-sm capitalize text-gray-500 shadow">
                                    <div className="col-span-6">
                                        <div className="flex items-center">
                                            <div className="flex flex-shrink-0 items-center justify-center pr-3">
                                                <input
                                                    type="checkbox"
                                                    className="h-5 w-5 accent-primary"
                                                    checked={isAllChecked}
                                                    onChange={handleAllChecked}
                                                />
                                            </div>
                                            <div className="flex-grow text-black">
                                                Sản phẩm
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-span-6">
                                        <div className="grid grid-cols-5 text-center">
                                            <div className="col-span-2">
                                                Đơn giá
                                            </div>
                                            <div className="col-span-1">
                                                Số lượng
                                            </div>
                                            <div className="col-span-1">
                                                Số tiền
                                            </div>
                                            <div className="col-span-1">
                                                Thao tác
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {extendedPurchases.length > 0 && (
                                    <div className="my-3 rounded-sm bg-white p-5 shadow">
                                        {extendedPurchases.map(
                                            (purchase, index) => (
                                                <div
                                                    key={purchase._id}
                                                    className="mb-5 grid grid-cols-12 items-center rounded-sm border border-gray-200 bg-white py-5 px-4 text-center text-sm text-gray-500 first:mt-0 "
                                                >
                                                    <div className="col-span-6">
                                                        <div className="flex">
                                                            <div className="flex flex-shrink-0 items-center justify-center pr-3">
                                                                <input
                                                                    type="checkbox"
                                                                    className="h-5 w-5 accent-primary"
                                                                    checked={
                                                                        purchase.checked
                                                                    }
                                                                    onChange={handleChecked(
                                                                        index,
                                                                    )}
                                                                />
                                                            </div>
                                                            <div className="flex-grow">
                                                                <div className="flex">
                                                                    <Link
                                                                        className="h-20 w-20 flex-shrink-0"
                                                                        to={`${
                                                                            path.home
                                                                        }${generateNameId(
                                                                            {
                                                                                name: purchase
                                                                                    .product
                                                                                    .name,
                                                                                id: purchase
                                                                                    .product
                                                                                    ._id,
                                                                            },
                                                                        )}`}
                                                                    >
                                                                        <img
                                                                            alt={
                                                                                purchase
                                                                                    .product
                                                                                    .name
                                                                            }
                                                                            src={
                                                                                purchase
                                                                                    .product
                                                                                    .image
                                                                            }
                                                                        />
                                                                    </Link>
                                                                    <div className="flex-grow px-2 pt-1 pb-2">
                                                                        <Link
                                                                            to={`${
                                                                                path.home
                                                                            }${generateNameId(
                                                                                {
                                                                                    name: purchase
                                                                                        .product
                                                                                        .name,
                                                                                    id: purchase
                                                                                        .product
                                                                                        ._id,
                                                                                },
                                                                            )}`}
                                                                            className="line-clamp-2"
                                                                        >
                                                                            {
                                                                                purchase
                                                                                    .product
                                                                                    .name
                                                                            }
                                                                        </Link>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-span-6">
                                                        <div className="grid grid-cols-5 items-center">
                                                            <div className="col-span-2">
                                                                <div className="flex items-center justify-center">
                                                                    <span className="text-gray-300 line-through">
                                                                        ₫
                                                                        {formatCurrency(
                                                                            purchase
                                                                                .product
                                                                                .price_before_discount,
                                                                        )}
                                                                    </span>
                                                                    <span className="ml-3">
                                                                        ₫
                                                                        {formatCurrency(
                                                                            purchase
                                                                                .product
                                                                                .price,
                                                                        )}
                                                                    </span>
                                                                </div>
                                                            </div>
                                                            <div className="col-span-1">
                                                                <QuantityController
                                                                    max={
                                                                        purchase
                                                                            .product
                                                                            .quantity +
                                                                        1
                                                                    }
                                                                    min={0}
                                                                    value={
                                                                        purchase.buy_count
                                                                    }
                                                                    classNameWrapper="flex items-center"
                                                                    onIncrease={(
                                                                        value,
                                                                    ) =>
                                                                        handleQuantityChange(
                                                                            index,
                                                                            value,
                                                                            value <=
                                                                                purchase
                                                                                    .product
                                                                                    .quantity,
                                                                        )
                                                                    }
                                                                    onDecrease={(
                                                                        value,
                                                                    ) =>
                                                                        handleQuantityChange(
                                                                            index,
                                                                            value,
                                                                            value >=
                                                                                1,
                                                                        )
                                                                    }
                                                                    onType={handleTypeQuantity(
                                                                        index,
                                                                    )}
                                                                    onFocusOutside={(
                                                                        value,
                                                                    ) =>
                                                                        handleQuantityChange(
                                                                            index,
                                                                            value,
                                                                            value >=
                                                                                1 &&
                                                                                value <=
                                                                                    purchase
                                                                                        .product
                                                                                        .quantity &&
                                                                                value !==
                                                                                    (
                                                                                        purchasesInCart as Purchase[]
                                                                                    )[
                                                                                        index
                                                                                    ]
                                                                                        .buy_count,
                                                                        )
                                                                    }
                                                                    disabled={
                                                                        purchase.disable
                                                                    }
                                                                />
                                                            </div>
                                                            <div className="col-span-1">
                                                                <span className="text-primary">
                                                                    ₫
                                                                    {formatCurrency(
                                                                        purchase
                                                                            .product
                                                                            .price *
                                                                            purchase.buy_count,
                                                                    )}
                                                                </span>
                                                            </div>
                                                            <div className="col-span-1">
                                                                <button
                                                                    className="bg-none text-black transition-colors hover:text-primary"
                                                                    onClick={handleDeletePurchase(
                                                                        index,
                                                                    )}
                                                                >
                                                                    Xóa
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ),
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="sticky bottom-0 z-10 mt-8 flex flex-col rounded-sm border border-gray-100 bg-white p-5 shadow sm:flex-row sm:items-center">
                            <div className="flex items-center">
                                <div className="flex flex-shrink-0 items-center justify-center pr-3">
                                    <input
                                        type="checkbox"
                                        className="h-5 w-5 accent-primary"
                                        checked={isAllChecked}
                                        onChange={handleAllChecked}
                                    />
                                </div>
                                <button className="mx-3 border-none bg-none">
                                    Chọn tất cả ({checkedPurchasesCount})
                                </button>
                                <button
                                    className="mx-3 border-none bg-none"
                                    onClick={handleDeleteManyPurchase}
                                >
                                    Xóa
                                </button>
                            </div>

                            <div className="mt-5 flex flex-col sm:ml-auto sm:mt-0 sm:flex-row sm:items-center">
                                <div>
                                    <div className="flex items-center sm:justify-end">
                                        <div>Tổng thanh toán (0 sản phẩm):</div>
                                        <div className="ml-2 text-2xl text-primary">
                                            ₫{formatCurrency(totalPrice)}
                                        </div>
                                    </div>
                                    <div className="flex items-center text-sm sm:justify-end">
                                        <div className="text-gray-500">
                                            Tiết kiệm
                                        </div>
                                        <div className="ml-6 text-primary">
                                            ₫{formatCurrency(totalPriceSale)}
                                        </div>
                                    </div>
                                </div>
                                <Button
                                    onClick={handleBuyProduct}
                                    className="mt-5 flex h-10 w-52 items-center justify-center bg-red-500 text-sm uppercase text-white hover:bg-red-600 sm:ml-4 sm:mt-0"
                                    isLoading={buyProductsMutation.isLoading}
                                >
                                    Mua hàng
                                </Button>
                            </div>
                        </div>
                    </Fragment>
                ) : (
                    <div className="text-center">
                        <img
                            src={noproduct}
                            alt="no purchase"
                            className="mx-auto h-24 w-24"
                        />
                        <h3 className="mt-5 font-bold text-gray-500">
                            Giỏ hàng của bạn còn trống
                        </h3>
                        <div className="mt-5">
                            <Link
                                to={path.home}
                                className="bg-primary px-6 py-2 uppercase text-white transition-colors hover:bg-primary/80"
                            >
                                Mua ngay
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
