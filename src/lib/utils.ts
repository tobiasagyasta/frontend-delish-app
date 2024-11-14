import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Utility function to format a date string into a readable format based on the provided locale.
 * @param {string} dateStr - The date string to format (e.g., '2024-11-12T12:45:00Z').
 * @param {string} locale - The locale string (e.g., 'en-US', 'id-ID').
 * @param {boolean} withYear - Show year or no (Default false).
 * @returns {string} The formatted date string.
 */
export const formatDate = (
  dateStr: string,
  locale = "id-ID",
  withYear = false
) => {
  // Convert the date string to a Date object
  const date = new Date(dateStr);
  let formattedDate = "";

  // Format the date as desired (you can adjust the options based on your needs)
  if (withYear) {
    formattedDate = date.toLocaleString(locale, {
      // weekday: "long", // Full day name (e.g., "Monday")
      year: "numeric", // Full year (e.g., "2024")
      month: "long", // Full month name (e.g., "November")
      day: "numeric", // Day of the month (e.g., "12")
    });
  } else {
    formattedDate = date.toLocaleString(locale, {
      // weekday: "long", // Full day name (e.g., "Monday")
      // year: "numeric", // Full year (e.g., "2024")
      month: "long", // Full month name (e.g., "November")
      day: "numeric", // Day of the month (e.g., "12")
    });
  }

  return formattedDate;
};
