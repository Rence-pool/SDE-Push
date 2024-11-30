import { ScrollArea } from "../../../components/ui/scroll-area";
import PropTypes from "prop-types";

import { useContext } from "react";
import { AuthContext } from "@/stores/AutProvider";

import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

export default function ModifyProductTypes({ trigger }) {
  const {
    userState: { id },
  } = useContext(AuthContext);

  // console.log(productDetails);

  const handleSheetClose = () => {};
  return (
    <Sheet modal onOpenChange={handleSheetClose}>
      <SheetTrigger asChild>{trigger}</SheetTrigger>
      <SheetContent className="flex flex-1 flex-col gap-2 outline" onInteractOutside={(event) => event.preventDefault()}>
        <SheetHeader>
          <SheetTitle>Modify Product Types</SheetTitle>
          <SheetDescription>
            {/* <span className="space-x-4">{updateError && <span className="text-red-500">{updateError.message}</span>}</span> */}
            <span className="space-x-4">error</span>
          </SheetDescription>
        </SheetHeader>
        <ScrollArea className="flex-1 overflow-auto">
          <span>Product Types</span>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
ModifyProductTypes.propTypes = {
  trigger: PropTypes.any,
  productDetails: PropTypes.object,
  refresher: PropTypes.func,
};
