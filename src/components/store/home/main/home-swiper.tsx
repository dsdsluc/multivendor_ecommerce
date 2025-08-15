"use client";
import AwesomeSlider from "react-awesome-slider";
import withAutoplay from "react-awesome-slider/dist/autoplay";
import "react-awesome-slider/dist/styles.css";
const AutoplaySlider = withAutoplay(AwesomeSlider);

import Image from "next/image";
export default function HomeMainSwiper() {
  return (
    <div>
      <AutoplaySlider
        animation="cubeAnimation"
        bullets={false}
        play={true}
        cancelOnInteraction={false}
        interval={6000}
      >
        {images.map((img) => (
          <div key={img.id}>
            <Image src={img.url} alt="" width={1920} height={600} />
          </div>
        ))}
      </AutoplaySlider>
    </div>
  );
}

const images = [
  { id: 1, url: "/assets/images/swiper/1.webp", alt: "Slide 1" },
  { id: 2, url: "/assets/images/swiper/2.webp", alt: "Slide 2" },
  { id: 3, url: "/assets/images/swiper/3.webp", alt: "Slide 3" },
  { id: 4, url: "/assets/images/swiper/4.webp", alt: "Slide 4" },
];
