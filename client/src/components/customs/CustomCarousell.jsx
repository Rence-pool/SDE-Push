import { Card, CardContent } from "@/components/ui/card";
import AVATAR from "../../assets/avatar.jpg";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export default function CustomCarousell() {
  const array = [1, 2, 3, 4];
  return (
    <Carousel className="max-w-[50rem] text-black">
      <CarouselContent>
        {array.map((value) => (
          <CarouselItem key={value} className="md:basis-1/2 lg:basis-1/3">
            <div className="p-1">
              <Card>
                <CardContent className="flex aspect-square items-center justify-center p-6">
                  <img
                    src={AVATAR}
                    alt="Shoes"
                    className="h-auto rounded-xl object-contain"
                  />
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
