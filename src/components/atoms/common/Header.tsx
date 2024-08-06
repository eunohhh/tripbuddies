import Image from 'next/image';
import Link from 'next/link';
import HeaderMyPageLink from './HeaderMyPageLink';

export default function Header() {
    return (
        <header className="hidden xl:flex relative w-[1080px] h-[100px] items-center bg-white justify-between z-50">
            <div className="flex gap-12 items-center font-bold">
                <Link href="/">
                    <Image
                        src="/images/logo.png"
                        alt="logo"
                        width={170}
                        height={64}
                        className="w-auto h-auto"
                        priority
                    />
                </Link>
                <Link href="/">HOME</Link>
                <Link href="/trips">여정</Link>
                <Link href="/chat">채팅</Link>
            </div>

            <HeaderMyPageLink />
        </header>
    );
}
