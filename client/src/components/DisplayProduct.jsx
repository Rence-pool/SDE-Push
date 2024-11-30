import { useNavigate } from "react-router-dom";
import { formatCurrency } from "../lib/functions";
import { Star } from "lucide-react";
import { Button } from "./ui/button";
import PropTypes from "prop-types";
export default function DisplayProduct({ item }) {
  const navigate = useNavigate();

  return (
    <div className="card bg-primary w-[10rem] cursor-pointer text-white shadow-xl hover:ring-2 hover:ring-yellow-500 lg:w-[17rem]">
      <figure className="p-2 lg:px-4 lg:pt-5" onClick={() => navigate(`/product/${item.ProductID}`)}>
        <img
          src={`http://localhost:3000/images/products/${item.ProductImage}`}
          alt="Shoes"
          className="h-auto rounded-xl object-contain lg:h-[15rem]"
        />
      </figure>
      <div className="card-body px-0.5 text-center lg:px-2" onClick={() => navigate(`/product/${item.ProductID}`)}>
        <div className="card-title text-start">
          <h2 className="flex-1 text-start text-xs font-semibold lg:text-lg">{item.ProductName}</h2>
        </div>
        <span className="text-secondary text-start text-xs font-bold lg:text-base">{formatCurrency(item.ProductDefaultPrice || 0)}</span>
        <span className="text-start text-xs">{item.ProductDescription}</span>
      </div>
      <div className="card-actions m-5 flex text-xs">
        <Button variant="secondary" type="button" className="flex-1">
          Add To Cart
        </Button>
        <Button variant="outline" className="text-black" type="button">
          {<Star />}
        </Button>
      </div>
    </div>
  );
}
DisplayProduct.propTypes = {
  item: PropTypes.object,
};
