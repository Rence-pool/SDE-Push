import { formatCurrency } from "@/lib/functions";
import PropTypes from "prop-types";
export default function DisplayProductVariant({ variant }) {
  return (
    <div className="flex flex-col">
      <span>
        Product Price:{" "}
        <span className="text-start text-base font-bold text-primary">
          {formatCurrency(variant.ProductPrice)}
        </span>
      </span>
      {variant.ProductSizeID !== "NULL" && (
        <span>{`Product Size: ${variant.ProductSizeName}`}</span>
      )}
      <span>
        Product Stock Left:{" "}
        <span className="text-start text-base font-bold text-primary">{`${variant.ProductStockLeft}`}</span>
      </span>

      {variant.ProductVariantID !== "NULL" && (
        <span>{`Variant Name: ${variant.ProductVariantName}`}</span>
      )}
    </div>
  );
}
DisplayProductVariant.propTypes = {
  variant: PropTypes.object,
};
