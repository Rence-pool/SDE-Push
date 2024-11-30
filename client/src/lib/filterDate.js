import { format } from "date-fns";
import { getCurrentDate } from "@/lib/functions";
export const filterDate = (date) => {
  if (date === undefined) return format(getCurrentDate(), "MMMM dd, y");
  if (date.from === undefined || date.to === undefined) return format(getCurrentDate(), "MMMM dd, y");
  const dateFrom = new Date(date.from);
  const dateTo = new Date(date.to);
  return `${format(dateFrom, "MMMM dd, y")} to ${format(dateTo, "MMMM dd, y")}`;
};
