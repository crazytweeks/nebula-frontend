import type { ClassValue } from "clsx";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const awaitFor = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export function capitalize(
  str: string | null | undefined | number | boolean | never | any
) {
  if (!str || typeof str !== "string" || str.length === 0) return "";

  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function upperCase(str: string) {
  return str.toUpperCase();
}
