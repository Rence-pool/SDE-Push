import { Heart, Loader } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect, useContext } from "react";
import { useUpdate } from "@/hooks/useUpdate";
import PropTypes from "prop-types";
import { AuthContext } from "@/stores/AutProvider";
import { getCurrentDate, getCurrentTime } from "@/lib/functions";

export default function ToggleFavorite({ isFavorite, productId, variant = "ghost" }) {
  console.log("isFavorite", isFavorite);
  const {
    userState: { id },
  } = useContext(AuthContext);

  const {
    data: updateFavorite,
    loading: updateFavoriteLoading,
    error: updateFavoriteError,
    updateValue: updateFavoriteData,
  } = useUpdate([], `http://localhost:3000/api/products/update/favorite/`, "Error updating favorite");
  const handleOnToggleFavorite = () => {
    const data = {
      id,
      productID: productId,
      time: `${getCurrentDate()} ${getCurrentTime()}`,
    };

    updateFavoriteData(data);
  };
  const [isFavoriteState, setIsFavorite] = useState(false);
  useEffect(() => {
    if (updateFavorite?.data?.affectedRows >= 1) setIsFavorite((prevState) => !prevState);
  }, [updateFavorite, setIsFavorite]);
  useEffect(() => {
    setIsFavorite((prevState) => !prevState);
  }, [isFavorite]);
  return (
    <>
      {updateFavoriteError && <div className="text-wrap text-xs text-white">{updateFavoriteError?.message}</div>}
      <Button
        disabled={id === undefined || updateFavoriteLoading}
        variant={variant}
        onClick={handleOnToggleFavorite}
        className="hover:bg-gray-100/50"
      >
        {updateFavoriteLoading ? <Loader /> : <Heart fill={isFavoriteState ? "red" : "white"} stroke="black" />}
      </Button>
    </>
  );
}
ToggleFavorite.propTypes = {
  productId: PropTypes.string,
  variant: PropTypes.string,
  isFavorite: PropTypes.any,
};
