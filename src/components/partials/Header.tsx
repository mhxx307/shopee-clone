import { AiOutlineSearch, AiOutlineShoppingCart } from 'react-icons/ai';
import { Link } from 'react-router-dom';

import { Logo } from 'src/components/icons';
import { Button, Popover } from 'src/components/shared';
import NavHeader from './NavHeader';

function Header() {
    return (
        <header className="bg-[linear-gradient(-180deg,#f53d2d,#f63)]">
            <div className="container">
                <NavHeader />

                <nav className="grid w-full grid-cols-10 space-x-4 py-4">
                    <div className="col-span-2">
                        <Link to="/">
                            <Logo className="h-full w-28 fill-white lg:w-44" />
                        </Link>
                    </div>

                    <form className="col-span-7">
                        <label
                            htmlFor="default-search"
                            className="sr-only mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                            Search
                        </label>
                        <div className="relative">
                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                <AiOutlineSearch />
                            </div>
                            <input
                                type="search"
                                id="default-search"
                                className="block w-full rounded-sm border-none border-gray-300 bg-gray-50 p-4 pl-10 text-sm text-gray-900 outline-none"
                                placeholder="FREESHIP ĐƠN TỪ 0 Đ..."
                                required
                            />
                            <Button
                                type="submit"
                                primary
                                className="absolute right-2.5 bottom-2.5"
                            >
                                <AiOutlineSearch />
                            </Button>
                        </div>
                    </form>

                    <div className="flex-center col-span-1 justify-self-end">
                        <Popover
                            renderPopover={
                                <div className="relative max-w-[400px] space-x-2 rounded-sm border border-gray-200 bg-white p-4 text-sm shadow-md">
                                    {/* header */}
                                    <div className="p-2">
                                        <p className="capitalize text-gray-400">
                                            Sản phẩm mới thêm
                                        </p>
                                    </div>

                                    {/* body */}
                                    <div className="flex">
                                        <div className="flex-shrink-0">
                                            <img
                                                src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZHVjdHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
                                                alt="product"
                                                className="h-11 w-11 object-cover"
                                            />
                                        </div>
                                        <div className="ml-2 flex-grow overflow-hidden">
                                            <p className="truncate">
                                                Lorem ipsum dolor sit amet
                                                consectetur adipisicing elit.
                                                Autem, odio possimus!
                                                Consequatur excepturi a
                                                repudiandae vel magnam atque
                                                laudantium officiis
                                            </p>
                                        </div>
                                        <div className="ml-2 flex-shrink-0">
                                            <span className="text-primary">
                                                đ400.000
                                            </span>
                                        </div>
                                    </div>

                                    {/* footer */}
                                    <div className="mt-6 flex items-center justify-between">
                                        <p className="text-sx capitalize text-gray-500">
                                            Thêm hàng vào giỏ
                                        </p>
                                        <Button primary>Xem giỏ hàng</Button>
                                    </div>
                                </div>
                            }
                        >
                            <Link to="/cart">
                                <AiOutlineShoppingCart className="cursor-pointer text-xl text-white lg:text-2xl" />
                            </Link>
                        </Popover>
                    </div>
                </nav>
            </div>
        </header>
    );
}

export default Header;
