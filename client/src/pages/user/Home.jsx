import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import slider1 from "@/assets/images/1.png";
import slider2 from "@/assets/images/2.png";
import slider3 from "@/assets/images/3.png";
import slider4 from "@/assets/images/4.png";
import slider5 from "@/assets/images/5.png";
import slider6 from "@/assets/images/6.png";
import slider7 from "@/assets/images/7.png";

import Autoplay from "embla-carousel-autoplay";
import { useRef } from "react";
export default function Home() {
  const carouselImages = [slider1, slider2, slider3, slider4, slider5, slider6, slider7];
  const plugin = useRef(Autoplay({ delay: 1500, stopOnInteraction: true }));
  return (
    <main className="flex flex-1 flex-col gap-3 p-3 lg:flex-row">
      <div className="flex max-w-[55rem] flex-1 items-center justify-center overflow-hidden rounded-2xl">
        <Carousel plugins={[plugin.current]} className="flex h-full items-center justify-center">
          <CarouselContent className="rounded-2xl">
            {carouselImages.map((image, index) => (
              <CarouselItem key={index} className="rounded-2xl">
                <img src={image} className="h-full w-full" />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
      <div className="flex flex-1 flex-col gap-2 overflow-hidden rounded-2xl">
        <div className="flex flex-1 bg-white text-black">
          <p className="flex-1 text-center">Insert Announcements here</p>
        </div>
        <div className="flex flex-1 bg-white text-black">
          <p className="flex-1 text-center">Insert Notifications here</p>
        </div>
      </div>
    </main>
  );
}
