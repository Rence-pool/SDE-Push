import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../stores/AutProvider";
import { Button } from "./ui/button";
import { getCurrentDate, getCurrentTime } from "@/lib/functions";
import { useUpdate } from "@/hooks/useUpdate";
import PropTypes from "prop-types";
import { toast } from "sonner";
export default function ProductImage({ defaultImage, productData }) {
  const {
    userState: { id },
  } = useContext(AuthContext);
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const {
    updateValue: updateProductData,
    loading: updateProductLoading,
    error: updateProductError,
    data: updateProduct,
  } = useUpdate([], `http://localhost:3000/api/products/update/productImage/`);

  useEffect(() => {
    if (defaultImage) {
      setImagePreview(defaultImage);
    }
  }, [defaultImage]);
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(file);
        setImagePreview(reader.result); // Set preview of the image
      };
      reader.readAsDataURL(file);
      const formData = new FormData();
      formData.append("image", file);
      formData.append("id", productData?.ProductID);
      formData.append("productName", productData?.ProductName);
      formData.append("actor", id);
      formData.append("date", `${getCurrentDate()} ${getCurrentTime()}`);
      formData.append("activityType", "APPLICATION");
      formData.append("activityDescription", `Update ${productData?.ProductName}$ Image ${file.name}`);

      updateProductData(formData);
    } else {
      alert("Please upload a valid image file.");
    }
  };

  useEffect(() => {
    if (updateProduct?.data?.affectedRows >= 1) {
      toast("Product Image Updated Successfully", {
        type: "success",
        autoClose: 2000,
        className: "m-5",
        pauseOnHover: true,
        closeOnClick: true,
        draggable: true,
      });
    }
  }, [updateProduct]);

  return (
    <>
      {imagePreview && (
        <img
          src={imagePreview}
          alt="Preview"
          className="max-h-96 max-w-72 cursor-pointer rounded-md"
          onClick={() => {
            document.getElementById("productImageInput").click();
          }}
        />
      )}
      <input type="file" hidden id="productImageInput" accept="image/*" onChange={handleFileChange} />
      {updateProductError && <div className="text-white">{updateProductError?.message}</div>}
      <Button
        variant="secondary"
        className={`h-20 text-lg uppercase ${imagePreview ? "hidden" : ""}`}
        onClick={() => {
          document.getElementById("productImageInput").click();
        }}
      >
        Add Image
      </Button>
    </>
  );
}
ProductImage.propTypes = {
  defaultImage: PropTypes.string,
  productData: PropTypes.object,
};
