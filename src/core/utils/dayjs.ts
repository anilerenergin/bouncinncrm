import dayjs from "dayjs";
import "dayjs/locale/en";
import "dayjs/locale/tr";
import localizedFormat from "dayjs/plugin/localizedFormat";
import relativeTime from "dayjs/plugin/relativeTime";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";

// Plugins
dayjs.extend(relativeTime);
dayjs.extend(localizedFormat);
dayjs.extend(utc);
dayjs.extend(timezone);

// Default locale
dayjs.locale("tr");

export { dayjs };

// Helper functions
export const formatDate = (date: string | Date, format = "DD MMMM YYYY") =>
  dayjs(date).format(format);

export const formatDateTime = (date: string | Date) =>
  dayjs(date).format("DD MMMM YYYY HH:mm");

export const formatRelative = (date: string | Date) => dayjs(date).fromNow();

export const isExpired = (expiresAt: number) => dayjs().unix() > expiresAt;
