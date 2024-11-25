export function productTypes_productProgram(product_info) {
  let productTypes = [];
  let productProgram = [];
  if (product_info?.data?.length > 0) {
    productTypes = product_info.data[0]?.map((type) => ({
      label: type.ProductTypename,
      value: type.ProductTypeID,
    }));

    productProgram = product_info.data[1]?.map((type) => ({
      label: type.ProgramName,
      value: type.ProgramID,
    }));
  }
  return { productTypes, productProgram };
}
