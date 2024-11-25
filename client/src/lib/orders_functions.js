export   function reareangeOrdersData(passedData) {
    if (!passedData) return;
    const newOrderedData = [];
    for (let i = 0; i < passedData.length; i++) {
      newOrderedData.push({
        or_date: passedData[i].OrderDate.split("T")[0],
        or_no: passedData[i].OrderID,
        status: passedData[i].OrderStatusID,
        sales: passedData[i].Sales,
        total: passedData[i].TotalAmount,
        s_name: ` ${passedData[i].UserFName} ${passedData[i].UserLName}`,
        s_program: passedData[i].Program,
        s_no: passedData[i].UserID,
        order: passedData[i].Order,
      });
    }
    return newOrderedData;
  }