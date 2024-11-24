import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "../../../components/ui/scroll-area";
import PropTypes from "prop-types";
import Input from "@/components/Input";
import { usePost } from "@/hooks/usePost";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CustomSkeleton from "../../../components/customs/CustomSkeleton";
import { getCurrentTime, getCurrentDate } from "@/lib/functions";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { useInput } from "@/hooks/useInput";
import { useFetch } from "@/hooks/useFetch";
import { formatCurrency } from "@/lib/functions";
import { useEffect, useState } from "react";
import { useContext } from "react";
import { AuthContext } from "@/stores/AutProvider";
export default function MakeOrdersheet({ trigger }) {
  const { user } = useContext(AuthContext);
  const [cart, setCart] = useState([]);
  const handleSheetClose = () => {
    handleProductSearchReset();
    handleCartReset();
    fetchSetError(null);
    reset();
  };
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setError,
  } = useForm({
    defaultValues: {
      name: "",
      studentId: "",
      date: getCurrentDate(),
      time: "",
      orders: [{}],
    },
  });

  const {
    value: productSearch,
    handleInputChange: handleProductSearchChange,
    handleInputBlur: handleProductSearchBlur,
    handleResetState: handleProductSearchReset,
    hasError: productSearchHasError,
  } = useInput("", () => true);

  const {
    data: initialFetch,
    loading: fetchLoading,
    error: fetchError,
    setError: fetchSetError,
  } = useFetch(
    "http://localhost:3000/api/products/fetch",
    [],
    "Error fetching Products",
  );

  const {
    data: postResponseData,
    postData: postOrder,
    loading: postLoading,
    error: postError,
  } = usePost("http://localhost:3000/api/orders/post_order", {});

  const handleCartReset = () => {
    setCart([]);
  };
  const filterFetch = initialFetch?.data?.filter((product) => {
    return product.ProductName.toLowerCase().includes(
      productSearch.toLowerCase(),
    );
  });
  const handleOnAddProduct = (product) => {
    setCart((prev) => {
      const exist = prev.find((item) => item.P_StockID === product.P_StockID);
      if (exist) {
        return prev.map((item) => {
          if (item.P_StockID === product.P_StockID) {
            return { ...item, quantity: item.quantity + 1 };
          }
          return item;
        });
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };
  const handleOnDeductProductQuantity = (product) => {
    setCart((prev) => {
      const exist = prev.find((item) => item.P_StockID === product.P_StockID);
      if (exist) {
        return prev
          .map((item) => {
            if (item.P_StockID === product.P_StockID) {
              if (item.quantity <= 1) {
                return null;
              }
              return { ...item, quantity: item.quantity - 1 };
            }
            return item;
          })
          .filter((item) => item !== null);
      }
      return prev;
    });
    handleProductSearchReset();
  };
  const totalOrder = cart.reduce((acc, item) => {
    return acc + item.P_AttributePrice * item.quantity;
  }, 0);
  const handleOnFormSubmit = async (data) => {
    handleProductSearchReset();

    if (data.studentId.length < 1 || data.name.length < 1 || cart.length < 1) {
      setError("root", {
        message: "Please fill all the fields",
      });
      return;
    }

    data.orders = cart;
    data.date = getCurrentDate();
    data.time = getCurrentTime();
    data.totalOrder = totalOrder;
    data.actor = user.id;
    try {
      console.log("Posting Order", data);
      await postOrder(data);
    } catch (error) {
      setError(error);
    }
  };

  useEffect(() => {
    if (postResponseData?.message === "Order Placed") {
      toast("Post Order", {
        className: "text-xs m-6",
        description: postResponseData?.message,
      });
    }
  }, [postResponseData]);

  return (
    <Sheet modal onOpenChange={handleSheetClose}>
      <SheetTrigger asChild>{trigger}</SheetTrigger>
      <SheetContent
        className="flex flex-1 flex-col gap-2 outline"
        onInteractOutside={(event) => event.preventDefault()}
      >
        <SheetHeader>
          <SheetTitle>Make Order</SheetTitle>
          <SheetDescription>
            <span className="block space-x-4">
              {errors.name && (
                <span className="text-red-500">{errors.name.message}</span>
              )}
              {errors.studentId && (
                <span className="text-red-500">{errors.studentId.message}</span>
              )}

              {errors.root && (
                <span className="text-red-500">{errors.root.message}</span>
              )}
            </span>
          </SheetDescription>
        </SheetHeader>
        <form
          className="flex h-full flex-col gap-5"
          onSubmit={handleSubmit(handleOnFormSubmit)}
        >
          {postLoading && <CustomSkeleton times={20} />}
          {postError && (
            <div className="m-auto text-2xl text-black">
              {postError?.message}
            </div>
          )}
          {fetchError && (
            <div className="m-auto text-2xl text-black">
              {fetchError?.message}
            </div>
          )}
          {fetchLoading && <CustomSkeleton times={20} />}
          {!fetchLoading && !fetchError && (
            <Tabs defaultValue="account" className="flex-1">
              <TabsList className="flex w-full">
                <TabsTrigger
                  className="flex-1 data-[state=active]:bg-gray-500 data-[state=active]:text-white"
                  value="account"
                >
                  Student Information
                </TabsTrigger>
                <TabsTrigger
                  className="flex-1 data-[state=active]:bg-gray-500 data-[state=active]:text-white"
                  value="products"
                >
                  Product Order
                </TabsTrigger>
              </TabsList>
              <TabsContent className="h-full px-2" value="account">
                <Input
                  type="text"
                  id="student-name"
                  placeholder="Student Name"
                  isError={errors.name}
                  register={{
                    ...register("name", {
                      required: "Name is required",
                      validate: (value) => {
                        const nameRegex = /^[A-Za-zÀ-ÿ\s-'"]+$/;
                        return (
                          nameRegex.test(value) || "Please enter a valid name."
                        );
                      },
                    }),
                  }}
                />
                <Input
                  type="text"
                  id="student-id"
                  placeholder="Student ID"
                  isError={errors.studentId}
                  register={{
                    ...register("studentId", {
                      required: "Student ID is required",
                      validate: (value) => {
                        if (value.length !== 11) {
                          return "Student ID must be 11 digits long";
                        }
                        if (isNaN(value)) {
                          return "Student ID must be a number";
                        }
                        return true;
                      },
                    }),
                  }}
                />
              </TabsContent>
              <TabsContent className="flex h-full px-2" value="products">
                <ScrollArea className="flex h-[27rem] flex-1 flex-col gap-2 pr-5">
                  {/* <ScrollArea className="m-2 flex h-[20rem] flex-1 flex-row gap-2 whitespace-nowrap"> */}
                  <div className="m-2 flex h-[20rem] flex-1 flex-col gap-2">
                    <Input
                      placeholder="Product"
                      value={productSearch}
                      onChange={handleProductSearchChange}
                      onBlur={handleProductSearchBlur}
                      onReset={handleProductSearchReset}
                      isError={productSearchHasError}
                    />

                    <ScrollArea className="flex flex-1 gap-2 whitespace-nowrap">
                      <div className="m-2 flex flex-nowrap gap-5">
                        {filterFetch?.map((product) => (
                          <div
                            key={product.P_StockID}
                            className="card bg-base-100 p-0 text-xs shadow-xl outline"
                          >
                            <div className="card-body text-xs">
                              <h2 className="card-title text-xs">
                                {product.ProductName}
                              </h2>
                              <span>{product.P_AttributeValue} </span>
                              <span>{product.P_AttributeSize} </span>

                              <span className="font-semibold tracking-wider">
                                {formatCurrency(product.P_AttributePrice)}{" "}
                              </span>

                              <Button
                                type="button"
                                size="sm"
                                className="h-5 uppercase tracking-wider"
                                onClick={() => {
                                  handleOnAddProduct(product);
                                }}
                                // className="btn btn-primary btn-xs uppercase tracking-wider"
                              >
                                Add
                              </Button>
                              {/* </div> */}
                            </div>
                          </div>
                        ))}
                      </div>

                      <ScrollBar orientation="horizontal" />
                    </ScrollArea>
                  </div>
                  <span>Order Details</span>
                  {cart.map((product) => (
                    <div
                      key={product.P_StockID}
                      className="card bg-base-100 mx-2 my-2 p-2 text-xs shadow-xl outline"
                    >
                      <span>{product.ProductName}</span>
                      <span>{product.P_AttributeValue} </span>
                      <span>{product.P_AttributeSize} </span>

                      <span className="font-semibold tracking-wider">
                        {formatCurrency(product.P_AttributePrice)}{" "}
                      </span>
                      <span>{`Quantity ${product.quantity}`} </span>
                      <Button
                        type="button"
                        size="sm"
                        className="h-5 uppercase tracking-wider"
                        onClick={() => {
                          handleOnDeductProductQuantity(product);
                        }}
                      >
                        Deduct
                      </Button>
                    </div>
                  ))}
                </ScrollArea>
              </TabsContent>
            </Tabs>
          )}
          <div>
            <span className="font-semibold tracking-wider">
              Total: {formatCurrency(totalOrder)}
            </span>
          </div>
          <Button>Submit</Button>
        </form>
      </SheetContent>
    </Sheet>
  );
}
