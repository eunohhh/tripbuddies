import Image from 'next/image';
import Link from 'next/link';

type MyTripsButtonProps = {
  view: 'created' | 'bookmarked' | 'participated';
  src: string;
  alt: string;
  id: string;
};

function MyTripsButton({ view, src, alt, id }: MyTripsButtonProps) {
  return (
    <div>
      <Link
        href={`/profile/mytrips/${id}?view=${view}`}
        className="flex items-center p-4 hover:bg-gray-1000"
      >
        <div className="relative aspect-auto flex w-[20px] justify-center items-center">
          <Image
            src={src}
            alt={alt}
            width={24}
            height={24}
            priority
            className="object-contain w-auto h-auto"
          />
        </div>
        <span className="mx-auto">{alt}</span>
        <Image
          src="/svg/navigate_next.svg"
          alt="다음"
          priority
          width={12}
          height={12}
          className="object-contain w-auto h-auto"
        />
      </Link>
    </div>
  );
}

export default MyTripsButton;
