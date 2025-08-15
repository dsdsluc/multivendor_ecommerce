"use client";

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";

export default function ProductSwiper({
  images,
  activeImage,
  setActiveImage,
}: {
  images: { url: string }[];
  activeImage: { url: string } | null;
  setActiveImage: Dispatch<SetStateAction<{ url: string } | null>>;
}) {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!images || !Array.isArray(images)) return null;

  return (
    <div className="relative xl:w-[25vw] swiper1700width">
      <div className="relative w-full flex flex-col-reverse 2xl:flex-row gap-2">
        {/* Thumbnails */}
        <div className="flex flex-wrap 2xl:flex-col gap-3">
          {images.map((img) => (
            <div
              key={img.url}
              className={cn(
                "w-16 h-16 rounded-md grid place-items-center overflow-hidden border border-gray-100 cursor-pointer transition-all duration-75 ease-in",
                {
                  "border-main-primary": activeImage?.url === img.url,
                }
              )}
              onMouseEnter={() => setActiveImage(img)}
            >
              <Image
                src={img.url}
                alt=""
                width={80}
                height={80}
                className="object-cover rounded-md"
              />
            </div>
          ))}
        </div>

        {/* Main image with zoom */}
        <div className="relative rounded-lg overflow-hidden flex flex-grow">
          {hasMounted && activeImage?.url && (
            <Zoom>
              <Image
                src={activeImage.url}
                alt="Product image"
                width={800}
                height={800}
                className="rounded-lg object-contain w-full h-auto"
              />
            </Zoom>
          )}
        </div>
      </div>
    </div>
  );
}
