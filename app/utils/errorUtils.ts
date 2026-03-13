import axios from "axios";

export function handleAxiosError(error: unknown, defaultMessage: string) {
  if (axios.isAxiosError(error)) {
    console.error(error.response?.data);
    return error.response?.data?.message || defaultMessage;
  }
  return defaultMessage;
}