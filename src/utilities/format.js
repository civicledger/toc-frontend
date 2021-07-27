import { format } from "date-fns";

export const shortDate = (date) => {
  if (!date) date = new Date();
  return format(date, "dd MMM yyyy");
};
