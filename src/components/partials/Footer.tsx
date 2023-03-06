import { FOOTER_ADDRESS, FOOTER_NAV } from 'src/constants';

function Footer() {
    return (
        <div className="bg-neutral-100 py-5">
            <div className="mx-auto max-w-7xl space-y-10 px-4">
                <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
                    <div className="lg:col-span-1">
                        <p className="text-[#848484]">
                            @ 2022 Shopee. Tất cả các quyền đều được bảo lưu
                        </p>
                    </div>
                    <div className="lg:col-span-2">
                        <p className="text-[#848484]">
                            Quốc gia & Khu vực: Singapore Indonesia Đài Loan
                            Thái Lan Malaysia Việt Nam Philippines Brazil México
                            Colombia Chile
                        </p>
                    </div>
                </div>

                <div className="flex items-center justify-center">
                    <ul className="flex space-x-14">
                        {FOOTER_NAV.map((item) => (
                            <li key={item.id} className="text-[#848484]">
                                {item.name}
                            </li>
                        ))}
                    </ul>
                </div>

                <div>
                    <p className="mb-14 text-center">Công ty TNHH Shopee</p>
                    <ul className="flex flex-col items-center justify-center space-y-4">
                        {FOOTER_ADDRESS.map((item) => (
                            <li key={item.id} className="text-[#848484]">
                                {item.name}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Footer;
