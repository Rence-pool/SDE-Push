import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import DisplayProductVariant from "@/components/DisplayProductVariant";
import PropTypes from "prop-types";
import AVATAR from "./../assets/avatar.jpg";
import { useNavigate } from "react-router-dom";
export default function Products({ product, handleProcessOrder }) {
  const navigate = useNavigate();
  return (
    <div
      title={product.ProductName}
      className="card w-[22rem] cursor-pointer bg-accent text-black shadow-xl hover:ring-4 hover:ring-gray-200"
      key={product.ProductID}
    >
      <figure className="px-3 py-5">
        <img
          src={AVATAR}
          alt={product.ProductName}
          className="h-auto rounded-xl object-contain"
        />
      </figure>
      <div className="card-body p-5">
        <h2 className="text-start text-lg font-semibold">
          {product.ProductName}
        </h2>
        <span>{product.ProductDescription}</span>
        <div className="my-4 flex w-full flex-1 flex-col gap-5">
          {product?.ProductVariants?.map((variant) => (
            <DisplayProductVariant
              key={`${product.ProductID}-${variant.ProductVariantID}-${variant.ProductSizeID}`}
              variant={variant}
            />
          ))}
        </div>
        <div className="flex justify-around gap-2">
          <Button
            className="btn btn-primary flex-1"
            onClick={() => {
              handleProcessOrder(product, "ProcessOrder");
            }}
          >
            Process Order
          </Button>
          <Button
            className="btn btn-primary flex-1"
            onClick={() => {
              handleProcessOrder(product, "AddToCart");
            }}
          >
            Add To Cart
          </Button>
          <Button
            onClick={() =>
              navigate(`/employee/inventory/product-details/${product.ProductID}`)
            }
            alt="Edit"
            className="btn bg-transparent text-black hover:bg-transparent hover:ring-4 hover:ring-primary"
            title="Edit"
          >
            <Pencil />
          </Button>
        </div>
      </div>
    </div>
  );
}
Products.propTypes = {
  product: PropTypes.object,
  handleProcessOrder: PropTypes.func,
};
