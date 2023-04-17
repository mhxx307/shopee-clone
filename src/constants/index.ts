const FOOTER_NAV = [
    { id: 1, name: 'CHÍNH SÁCH BẢO MẬT' },
    { id: 2, name: 'QUY CHẾ HOẠT ĐỘNG' },
    { id: 3, name: 'CHÍNH SÁCH VẬN CHUYỂN' },
    { id: 4, name: 'CHÍNH SÁCH TRẢ HÀNG VÀ HOÀN TIỀN' },
];

const FOOTER_ADDRESS = [
    {
        id: 1,
        name: 'Địa chỉ: Tầng 4-5-6, Tòa nhà Capital Place, số 29 đường Liễu Giai, Phường Ngọc Khánh, Quận Ba Đình, Thành phố Hà Nội, Việt Nam. Tổng đài hỗ trợ: 19001221 - Email: cskh@hotro.shopee.vn',
    },
    {
        id: 2,
        name: 'Chịu Trách Nhiệm Quản Lý Nội Dung: Nguyễn Đức Trí - Điện thoại liên hệ: 024 73081221 (ext 4678)',
    },
    {
        id: 3,
        name: 'Mã số doanh nghiệp: 0106773786 do Sở Kế hoạch & Đầu tư TP Hà Nội cấp lần đầu ngày 10/02/2015',
    },
    { id: 4, name: '© 2015 - Bản quyền thuộc về Công ty TNHH Shopee' },
];

const path = {
    home: '/',
    user: '/user',
    profile: '/user/profile',
    changePassword: '/user/password',
    historyPurchase: '/user/purchase',
    login: '/login',
    register: '/register',
    logout: '/logout',
    purchase: '/history-purchase',
    productDetail: ':nameId',
    cart: '/cart',
} as const;

const productSortBy = {
    createAt: 'createAt',
    sold: 'sold',
    view: 'view',
    price: 'price',
} as const;

const productOrderBy = {
    asc: 'asc',
    desc: 'desc',
} as const;

export { FOOTER_NAV, FOOTER_ADDRESS, path, productSortBy, productOrderBy };
