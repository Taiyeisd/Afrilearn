import Image from 'next/image';

interface TrustBarProps {
  logos: {
    src: string;
    alt: string;
  }[];
}

export default function TrustBar({ logos }: TrustBarProps) {
  return (
    <div className="bg-white py-12">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <p className="text-center text-sm font-semibold text-zinc-400">
            Trusted by leading organizations worldwide
          </p>
          <div className="mt-8 grid grid-cols-2 items-center gap-x-8 gap-y-10 sm:grid-cols-3 sm:gap-x-10 lg:grid-cols-4">
            {logos.map((logo) => (
              <div key={logo.alt} className="flex justify-center">
                <Image
                  className="max-h-12 w-full object-contain grayscale"
                  src={logo.src}
                  alt={logo.alt}
                  width={158}
                  height={48}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}