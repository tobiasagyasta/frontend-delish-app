import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatDate = (
  dateStr: string,
  locale = "id-ID",
  withYear = false,
  showTime = false // Add new `showTime` parameter to format time
) => {
  const date = new Date(dateStr);

  // Check if the date is valid
  if (isNaN(date.getTime())) {
    return "Invalid Date"; // Return a fallback string if the date is invalid
  }

  let formattedDate = "";

  // If we only want the time (showTime = true)
  if (showTime) {
    formattedDate = date.toLocaleString(locale, {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false, // 24-hour format
    });
  } else if (withYear) {
    // Format with year
    formattedDate = date.toLocaleString(locale, {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } else {
    // Format without year
    formattedDate = date.toLocaleString(locale, {
      month: "long",
      day: "numeric",
    });
  }

  return formattedDate;
};
