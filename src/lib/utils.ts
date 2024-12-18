import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getSessionStorageItem(key: string) {
  const item = sessionStorage.getItem(key);
  return item ? JSON.parse(item) : null;
}
