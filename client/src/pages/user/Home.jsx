import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import slider1 from "../../assets/images/slider1.jpg";
import slider2 from "../../assets/images/slider2.png";
import slider3 from "../../assets/images/Slider3.png";
import Autoplay from "embla-carousel-autoplay";
import { useRef } from "react";
export default function Home() {
  const carouselImages = [slider1, slider2, slider3];
  const plugin = useRef(Autoplay({ delay: 2000, stopOnInteraction: true }));
  return (
    <main className="flex flex-1 flex-col gap-3 lg:flex-row">
      <div className="flex max-w-[55rem] flex-1 items-center justify-center overflow-hidden rounded-2xl">
        <Carousel
          plugins={[plugin.current]}
          className="flex h-full items-center justify-center"
        >
          <CarouselContent>
            {carouselImages.map((image, index) => (
              <CarouselItem key={index}>
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
