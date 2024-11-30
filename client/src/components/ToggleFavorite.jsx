import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useUpdate } from "@/hooks/useUpdate";
export default function ToggleFavorite() {
  const [isFavorite, setIsFavorite] = useState(false);
  return (
    <Button variant="ghost" onClick={() => setIsFavorite((prevState) => !prevState)} className="hover:bg-gray-100/50">
      <Heart fill={isFavorite ? "red" : "white"} stroke="black" />
    </Button>
  );
}
