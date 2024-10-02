import Image from 'next/image';

interface WelcomeImageProps {
  isGray?: boolean;
}

export default function WelcomeImage({ isGray = false }: WelcomeImageProps) {
  return (
    <Image
      src="/buddy_mascot.webp"
      alt="buddy character"
      width={250}
      height={250}
      className={`h-[250px] w-[250px] xl:w-[500px] xl:h-[500px] ${isGray ? 'filter grayscale' : ''}`}
    />
  );
}
