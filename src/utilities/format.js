import { format, parseISO } from "date-fns";

export const shortDate = (date) => {
  if (!date) date = new Date();
  return format(date, "dd MMM yyyy");
};

export const shortRawDate = (dateString) => {
  if (!dateString) return "";
  return format(parseISO(dateString), "dd MMM yyyy");
};
