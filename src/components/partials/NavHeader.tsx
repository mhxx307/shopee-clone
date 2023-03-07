import { AiOutlineGlobal } from 'react-icons/ai';
import { BsChevronDown } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { Avatar, Button, Popover } from 'src/components/shared';

function NavHeader() {
    return (
        <div className="flex items-center justify-end space-x-4 py-2">
            <Popover
                renderPopover={
                    <div className="relative rounded-sm border border-gray-200 bg-white shadow-md">
                        <div className="flex flex-col py-2 pr-28 pl-3">
                            <button className="py-2 px-3 text-left hover:text-primary">
                                Tiếng Việt
                            </button>
                            <button className="mt-2 py-2 px-3 text-left hover:text-primary">
                                English
                            </button>
                        </div>
                    </div>
                }
            >
                <Button
                    secondary
                    RightIcon={BsChevronDown}
                    LeftIcon={AiOutlineGlobal}
                >
                    Tiếng Việt
                </Button>
            </Popover>
            <Popover
                renderPopover={
                    <div className="relative rounded-sm border border-gray-200 bg-white shadow-md">
                        <Link
                            to={'/profile'}
                            className="block w-full bg-white py-3 px-4 text-left hover:bg-slate-100 hover:text-cyan-500"
                        >
                            Tài khoản của tôi
                        </Link>
                        <Link
                            to={'history-purchase'}
                            className="block w-full bg-white py-3 px-4 text-left hover:bg-slate-100 hover:text-cyan-500"
                        >
                            Đơn mua
                        </Link>
                        <button className="block w-full bg-white py-3 px-4 text-left hover:bg-slate-100 hover:text-cyan-500">
                            Đăng xuất
                        </button>
                    </div>
                }
            >
                <Button secondary>
                    <Avatar />
                </Button>
            </Popover>
        </div>
    );
}

export default NavHeader;
