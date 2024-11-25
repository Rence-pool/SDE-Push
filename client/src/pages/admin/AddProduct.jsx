import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { usePost } from "@/hooks/usePost";
import { toast } from "sonner";
import CustomSkeleton from "@/components/customs/CustomSkeleton";
import AddProductForm from "@/components/AddProductForm";
export default function AddProduct() {
  const navigate = useNavigate();
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const {
    data: postData,
    loading: postLoading,
    error: postError,
    postData: postProduct,
  } = usePost("http://localhost:3000/api/products/post/new_product", []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(file);
        setImagePreview(reader.result); // Set preview of the image
      };
      reader.readAsDataURL(file);
    } else {
      alert("Please upload a valid image file.");
    }
  };

  useEffect(() => {
    if (postData?.message === "Product Posting successfull") {
      toast("Created  Product Successful 🎉", {
        className: "m-5",
        description: `Placed Product successfully  `,
      });
    }
  }, [postData]);

  const onSubmitPost = async (data, productType, productProgramID, productProgramIDHasError, productTypeHasError, setError) => {
    console.log(data);
    if (productTypeHasError || productProgramIDHasError || productType === "" || productProgramID === "") {
      setError("root", {
        message: "Please fill all the fields",
      });
      return;
    }
    data.productProgram = productProgramID;
    data.productType = productType;

    data.productAttributes = data.productAttributes.map((field) => {
      return {
        productAttributeName: field.productAttributeName.toUpperCase(),
        productAttributeValue: field.productAttributeValue.toUpperCase(),
        productAttributeSize: field.productAttributeSize.toUpperCase(),
        productAttributePrice: field.productAttributePrice.toFixed(2),
        productStockID: `${data.productID}_${field.productAttributeValue.toUpperCase()}_${field.productAttributeSize.toUpperCase()}`,
        productStockQuantity: field.productStockQuantity,
      };
    });
    data.productImage = image;

    const formData = new FormData();
    formData.append("productImage", data.productImage);
    formData.append("productID", data.productID);
    formData.append("productName", data.productName);
    formData.append("productDescription", data.productDescription);
    formData.append("productDefaultPrice", data.productDefaultPrice);
    formData.append("productProgram", data.productProgram);
    formData.append("productType", data.productType);
    formData.append("stringProductAttributes", JSON.stringify(data.productAttributes));
    await postProduct(formData);
  };

  return (
    <main className="m-5 flex flex-1 flex-col gap-2 text-black">
      <div className="flex items-center justify-between">
        <Button className="bg-white text-black hover:bg-white/80" onClick={() => navigate(-1)}>
          <ChevronLeft />
        </Button>

        <Button
          disabled={postLoading}
          className="bg-white text-black hover:bg-white/80"
          onClick={() => document.getElementById("submit").click()}
        >
          {postLoading ? "Posting..." : "Post Product"}
        </Button>
      </div>

      {postError && <div className="text-white">{postError?.message}</div>}

      {postLoading && <CustomSkeleton times={20} />}
      <ScrollArea className="flex flex-1 flex-col justify-center p-2 pr-0.5">
        <header className="flex flex-col items-center justify-center gap-2 p-2">
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Preview"
              className="max-h-96 max-w-72 cursor-pointer rounded-md outline"
              onClick={() => {
                document.getElementById("productImageInput").click();
              }}
            />
          )}
          <input type="file" hidden id="productImageInput" accept="image/*" onChange={handleFileChange} />
          <Button
            variant="secondary"
            className={`h-20 text-lg uppercase ${imagePreview ? "hidden" : ""}`}
            onClick={() => {
              document.getElementById("productImageInput").click();
            }}
          >
            Add Image
          </Button>
        </header>
        <section>
          <AddProductForm onSubmitPost={onSubmitPost} />
        </section>
      </ScrollArea>
    </main>
  );
}
