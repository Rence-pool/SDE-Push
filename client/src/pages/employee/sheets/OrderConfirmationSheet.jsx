import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  // SheetFooter,
  // SheetClose,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import PropTypes from "prop-types";
import Input from "@/components/Input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useUpdate } from "@/hooks/useUpdate";
import CustomSkeleton from "@/components/customs/CustomSkeleton";
import { getCurrentTime } from "@/lib/functions";
import { toast } from "sonner";
import { useState, useEffect } from "react";
import { useContext } from "react";
import { AuthContext } from "@/stores/AutProvider";
export default function OrderConfirmationSheet({ trigger, content, refresher }) {
  const {
    userState: { id },
  } = useContext(AuthContext);

  const { data: updateData, loading, error, updateValue, setError } = useUpdate([], "http://localhost:3000/api/orders/update/status/");

  const [orders, setOrders] = useState(content);

  const handleSheetClose = (event) => {
    if (event) return;
    setError(null);
  };

  const handleSubmit = async (event, order) => {
    event.preventDefault(); // Prevent the default form submission behavior

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());

    const postSales = {
      id: data["order-id"],
      orderID: data["order-id"],
      paymentAmount: data["payment-amount"],
      paymentDate: data["payment-date"],
      paymentID: data["payment-id"],
      userID: order.s_no,
      postTime: getCurrentTime(),
      newOrderStatus: "ORDER_200",
      actor: id,
    };

    await updateValue(postSales);
  };

  useEffect(() => {
    if (updateData?.data) {
      toast("Order Updated", {
        className: "text-xs m-6",
        description: `Order Updated Sucessful`,
      });
      refresher((prevState) => !prevState);
    }
  }, [updateData?.data, refresher]);
  useEffect(() => {
    if (error) {
      toast("Process Error", {
        className: "text-xs m-6",
        description: `Error updating order status :( Please try again`,
      });
    }
  }, [error]);
  useEffect(() => {
    if (updateData?.data === undefined) {
      setOrders(content);
    } else {
      setOrders((prevState) => {
        return prevState.filter((order) => order.or_no !== updateData?.data);
      });
    }
  }, [content, updateData?.data]);

  return (
    <Sheet modal onOpenChange={handleSheetClose}>
      <SheetTrigger asChild>{trigger}</SheetTrigger>
      <SheetContent className="flex flex-1 flex-col gap-2 outline" onInteractOutside={(event) => event.preventDefault()}>
        <SheetHeader>
          <SheetTitle>Mark Orders Complete</SheetTitle>
          <SheetDescription>
            <span>Mark orders as complete</span>
          </SheetDescription>
        </SheetHeader>
        {loading && <CustomSkeleton times={20} />}
        {error && <div className="m-auto text-xs">Error: {error.message}</div>}

        {!error && !loading && (
          <Tabs className="w-full flex-1">
            <TabsList className="flex w-full items-center justify-center">
              <ScrollArea className="w-[45rem] whitespace-nowrap px-2 py-5">
                {orders.map((order) => (
                  <TabsTrigger className="mx-5" key={order.or_no} value={order.or_no}>
                    {order.or_no}
                  </TabsTrigger>
                ))}

                <ScrollBar orientation="horizontal" />
              </ScrollArea>
            </TabsList>
            {orders.length > 0 &&
              orders.map((order) => (
                <TabsContent key={order.or_no} value={order.or_no}>
                  <form className="space-y-5" onSubmit={(event) => handleSubmit(event, order)}>
                    <ScrollArea className="flex h-[30rem] flex-1 flex-col gap-2 p-2 pr-4">
                      <div className="flex flex-col p-2">
                        <span>{`Student Name: ${order.s_name}`}</span>
                        <span>{`Order ID:${order.or_no}`}</span>
                        <span className="my-2 text-center font-semibold">Order Breakdown</span>
                        <div className="flex flex-col gap-2">
                          {order.order.OrderBreakDown.map(
                            (
                              orderBreakDown, // Loop through the order breakdown
                            ) => (
                              <div className="flex flex-col" key={orderBreakDown.ProductAttributeID}>
                                <span>{`Product Name: ${orderBreakDown.ProductName}`}</span>
                                <span>{`Product Size: ${orderBreakDown.ProductSize}`}</span>
                                <span>{`Product Variant: ${orderBreakDown.ProductVariant}`}</span>
                                <span>{`Order Quantity: ${orderBreakDown.OrderQuantity}`}</span>
                                <span>{`Product Price: ${orderBreakDown.ProductPrice}`}</span>
                                <span>{`Total: ${orderBreakDown.OrderTotal}`}</span>
                              </div>
                            ),
                          )}
                          <span className="label font-semibold">Overall Total Amount: {order.total}</span>
                          <Input
                            required
                            placeholder={"OrderID"}
                            type={"text"}
                            id={"order-id"}
                            name="order-id"
                            value={order.or_no}
                            onChange={() => {}}
                          />

                          <Input
                            required
                            placeholder={"Payment ID  Payment Date+ Transaction Number"}
                            type={"text"}
                            id={"payment-id"}
                            name="payment-id"
                          />
                          <Input
                            required
                            placeholder={"Payment  Amount"}
                            type={"number"}
                            id={"payment-amount"}
                            name="payment-amount"
                            value={order.total}
                            onChange={() => {}}
                          />
                          <Input required placeholder={"Payment  Date"} type={"date"} id={"payment-date"} name="payment-date" />
                        </div>
                      </div>
                    </ScrollArea>
                    <Button className="w-full">Submit</Button>
                  </form>
                </TabsContent>
              ))}
          </Tabs>
        )}
      </SheetContent>
    </Sheet>
  );
}
OrderConfirmationSheet.propTypes = {
  trigger: PropTypes.any,
  content: PropTypes.array,
};
