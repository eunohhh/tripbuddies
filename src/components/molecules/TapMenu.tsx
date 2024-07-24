import Image from 'next/image';

const TapMenu = () => {
    return (
        <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-[375px] bg-white border-t-2 border-gray-200 grid grid-cols-4 xl:hidden">
            <button className="flex items-center justify-center p-4 hover:bg-gray-200 focus:outline-none">
                <Image src="/svg/Home.svg" alt="Home" width={24} height={24} />
            </button>
            <button className="flex items-center justify-center p-4 hover:bg-gray-200 focus:outline-none">
                <Image
                    src="/svg/Travel.svg"
                    alt="Travel"
                    width={24}
                    height={24}
                />
            </button>
            <button className="flex items-center justify-center p-4 hover:bg-gray-200 focus:outline-none">
                <Image src="/svg/Chat.svg" alt="Chat" width={24} height={24} />
            </button>
            <button className="flex items-center justify-center p-4 hover:bg-gray-200 focus:outline-none">
                <Image
                    src="/svg/Mypage.svg"
                    alt="MyPage"
                    width={24}
                    height={24}
                />
            </button>
        </div>
    );
};

export default TapMenu;
