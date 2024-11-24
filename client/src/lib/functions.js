export const calculateDifference = (date) => {
  if (date !== undefined && date.from !== undefined && date.to !== undefined) {
    const from = new Date(date.from);
    const to = new Date(date.to);
    const diff = to.getTime() - from.getTime();
    const diffDays = Math.ceil(diff / (1000 * 3600 * 24));
    return diffDays;
  }
  return "Pick a date";
};
export function filterData(data, search) {
  return data.filter(
    (item) =>
      item.ProductName.toLowerCase().includes(search.toLowerCase()) ||
      item.ProductDescription.toLowerCase().includes(search.toLowerCase()),
  );
}
export const formatCurrency = (amount) => {
  return new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
  }).format(amount);
};
export const dateToday = new Date();
export const columnWidths = {
  "OR DATE": "w-[125px]",
  "STUDENT NO": "w-[150px]",
  "STUDENT NAME": "w-[150px]",
  PROGRAM: "w-[100px]",
  "OR NO": "w-[200px]",
  STATUS: "w-[100px]",
  SALES: "w-[150px]",
  TOTAL: "w-[90px]",
  ACTIONS: "w-[80px]",
};
export function getCurrentTime() {
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, "0"); // Get hours and pad to 2 digits
  const minutes = now.getMinutes().toString().padStart(2, "0"); // Get minutes and pad to 2 digits
  const seconds = now.getSeconds().toString().padStart(2, "0"); // Get seconds and pad to 2 digits

  return `${hours}:${minutes}:${seconds}`;
}
export function getCurrentDate() {
  const now = new Date();
  const month = (now.getMonth() + 1).toString().padStart(2, "0"); // Get month (0-11, so add 1)
  const day = now.getDate().toString().padStart(2, "0"); // Get day (1-31)
  const year = now.getFullYear().toString(); // Get last two digits of the year

  return `${year}-${month}-${day}`;
}

export const generateOrderID = () => {
  return `02000${getCurrentDate()}-${getCurrentTime()}`;
};
export const orderStatus = [
  {
    or_date: "2023-04-01",
    or_no: "95730102024309924",
    status: "Failed",
    sales: 20000,
    total: 200000,
    s_name: "Ken Andrew Carlon",
    s_no: "02000309926",
    s_program: "BSIT",
  },
  {
    or_date: "2023-04-01",
    or_no: "95730102024309925",
    status: "On Going",
    sales: 20000,
    total: 200000,
    s_name: "Ken Andrew Carlon",
    s_no: "02000309926",
    s_program: "BSIT",
  },
  {
    or_date: "2023-04-01",
    or_no: "95730102024309926",
    status: "Complete",
    sales: 2000,
    total: 20000,
    s_name: "Ken Andrew Carlon",
    s_no: "02000309926",
    s_program: "BSIT",
  },
  {
    or_date: "2023-04-01",
    or_no: "95730102024309927",
    status: "On Going",
    sales: 2000,
    total: 20000,
    s_name: "Ken Andrew Carlon",
    s_no: "02000309926",
    s_program: "BSIT",
  },
  {
    or_date: "2023-04-01",
    or_no: "95730102024309928",
    status: "On Going",
    sales: 200000,
    total: 200000,
    s_name: "Ken Andrew Carlon",
    s_no: "02000309926",
    s_program: "BSIT",
  },
  {
    or_date: "2023-04-01",
    or_no: "95730102024309929",
    status: "On Going",
    sales: 200000,
    total: 200000,
    s_name: "Ken Andrew Carlon",
    s_no: "02000309926",
    s_program: "BSIT",
  },
  {
    or_date: "2023-04-01",
    or_no: "957301020243099210",
    status: "On going",
    sales: 200000,
    total: 200000,
    s_name: "Ken Andrew Carlon",
    s_no: "02000309926",
    s_program: "BSIT",
  },
  {
    or_date: "2023-04-01",
    or_no: "957301020243099211",
    status: "Complete",
    sales: 2000000,
    total: 20000000,
    s_name: "Ken Andrew Carlon",
    s_no: "02000309926",
    s_program: "BSIT",
  },
  {
    or_date: "2023-04-01",
    or_no: "9573010202430992",
    status: "On Going",
    sales: 200000,
    total: 200000,
    s_name: "Ken Andrew Carlon",
    s_no: "02000309926",
    s_program: "BSIT",
  },
  {
    or_date: "2023-04-01",
    or_no: "9573010202430992",
    status: "On Going",
    sales: 200000,
    total: 200000,
    s_name: "Ken Andrew Carlon",
    s_no: "02000309926",
    s_program: "BSIT",
  },
  {
    or_date: "2023-04-01",
    or_no: "9573010202430992",
    status: "On Going",
    sales: 200000,
    total: 200000,
    s_name: "Ken Andrew Carlon",
    s_no: "02000309926",
    s_program: "BSIT",
  },
  {
    or_date: "2023-04-01",
    or_no: "9573010202430992",
    status: "On Going",
    sales: 200000,
    total: 200000,
    s_name: "Ken Andrew Carlon",
    s_no: "02000309926",
    s_program: "BSIT",
  },
  {
    or_date: "2023-04-01",
    or_no: "9573010202430992",
    status: "On Going",
    sales: 200000,
    total: 200000,
    s_name: "Ken Andrew Carlon",
    s_no: "02000309926",
    s_program: "BSIT",
  },
  {
    or_date: "2023-04-01",
    or_no: "9573010202430992",
    status: "On Going",
    sales: 200000,
    total: 200000,
    s_name: "Ken Andrew Carlon",
    s_no: "02000309926",
    s_program: "BSIT",
  },
  {
    or_date: "2023-04-01",
    or_no: "9573010202430992",
    status: "On Going",
    sales: 200000,
    total: 200000,
    s_name: "Ken Andrew Carlon",
    s_no: "02000309926",
    s_program: "BSIT",
  },
  {
    or_date: "2023-04-01",
    or_no: "9573010202430992",
    status: "On Going",
    sales: 200000,
    total: 200000,
    s_name: "Ken Andrew Carlon",
    s_no: "02000309926",
    s_program: "BSIT",
  },

  {
    or_date: "2023-04-01",
    or_no: "9573010202430992",
    status: "On Going",
    sales: 200000,
    total: 200000,
    s_name: "Ken Andrew Carlon",
    s_no: "02000309926",
    s_program: "BSIT",
  },
  {
    or_date: "2023-04-01",
    or_no: "9573010202430992",
    status: "On Going",
    sales: 200000,
    total: 200000,
    s_name: "Ken Andrew Carlon",
    s_no: "02000309926",
    s_program: "BSIT",
  },
  {
    or_date: "2023-04-01",
    or_no: "9573010202430992",
    status: "On Going",
    sales: 200000,
    total: 200000,
    s_name: "Ken Andrew Carlon",
    s_no: "02000309926",
    s_program: "BSIT",
  },
  {
    or_date: "2023-04-01",
    or_no: "9573010202430992",
    status: "On Going",
    sales: 200000,
    total: 200000,
    s_name: "Ken Andrew Carlon",
    s_no: "02000309926",
    s_program: "BSIT",
  },
  {
    or_date: "2023-04-01",
    or_no: "9573010202430992",
    status: "On Going",
    sales: 200000,
    total: 200000,
    s_name: "Ken Andrew Carlon",
    s_no: "02000309926",
    s_program: "BSIT",
  },

  {
    or_date: "2023-04-01",
    or_no: "9573010202430992",
    status: "On Going",
    sales: 200000,
    total: 200000,
    s_name: "Ken Andrew Carlon",
    s_no: "02000309926",
    s_program: "BSIT",
  },
  {
    or_date: "2023-04-01",
    or_no: "9573010202430992",
    status: "On Going",
    sales: 200000,
    total: 200000,
    s_name: "Ken Andrew Carlon",
    s_no: "02000309926",
    s_program: "BSIT",
  },
  {
    or_date: "2023-04-01",
    or_no: "9573010202430992",
    status: "On Going",
    sales: 200000,
    total: 200000,
    s_name: "Ken Andrew Carlon",
    s_no: "02000309926",
    s_program: "BSIT",
  },
  {
    or_date: "2023-04-01",
    or_no: "9573010202430992",
    status: "On Going",
    sales: 200000,
    total: 200000,
    s_name: "Ken Andrew Carlon",
    s_no: "02000309926",
    s_program: "BSIT",
  },
  {
    or_date: "2023-04-01",
    or_no: "9573010202430992",
    status: "On Going",
    sales: 200000,
    total: 200000,
    s_name: "Ken Andrew Carlon",
    s_no: "02000309926",
    s_program: "BSIT",
  },
  {
    or_date: "2023-04-01",
    or_no: "9573010202430992",
    status: "On Going",
    sales: 200000,
    total: 200000,
    s_name: "Ken Andrew Carlon",
    s_no: "02000309926",
    s_program: "BSIT",
  },
  {
    or_date: "2023-04-01",
    or_no: "9573010202430992",
    status: "On Going",
    sales: 200000,
    total: 200000,
    s_name: "Ken Andrew Carlon",
    s_no: "02000309926",
    s_program: "BSIT",
  },
  {
    or_date: "2023-04-01",
    or_no: "9573010202430992",
    status: "On Going",
    sales: 200000,
    total: 200000,
    s_name: "Ken Andrew Carlon",
    s_no: "02000309926",
    s_program: "BSIT",
  },
  {
    or_date: "2023-04-01",
    or_no: "9573010202430992",
    status: "On Going",
    sales: 200000,
    total: 200000,
    s_name: "Ken Andrew Carlon",
    s_no: "02000309926",
    s_program: "BSIT",
  },
];
