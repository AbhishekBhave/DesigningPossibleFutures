import { useState } from 'react';
import { Compass } from 'lucide-react';

interface EditorialImageProps {
  src: string;
  alt: string;
  caption?: string;
  className?: string;
  aspectClassName?: string;
}

export function EditorialImage({
  src,
  alt,
  caption,
  className = '',
  aspectClassName = 'aspect-[4/3]',
}: EditorialImageProps) {
  const [hasError, setHasError] = useState(false);

  return (
    <figure className={`flex flex-col ${className}`}>
      <div
        className={`relative w-full overflow-hidden border border-[#E2DDD3] bg-[#F3EFE7] ${aspectClassName}`}
      >
        {!hasError ? (
          <img
            src={src}
            alt={alt}
            referrerPolicy="no-referrer"
            onError={() => setHasError(true)}
            className="h-full w-full object-cover transition-transform duration-500 ease-out"
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-3 bg-gradient-to-br from-[#F3EFE7] to-[#E6DFD1] p-6 text-center">
            <Compass className="h-7 w-7 text-[#57534E]" strokeWidth={1.25} />
            <p className="font-editorial text-lg italic text-[#1C1917] max-w-xs">
              {alt}
            </p>
          </div>
        )}
      </div>
      {caption && (
        <figcaption className="mt-2.5 font-editorial text-[13px] italic leading-snug text-[#57534E]">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
