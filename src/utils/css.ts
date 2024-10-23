import clsx, { type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merges classes together with the most compatibility possible
 * @returns finalized class
 */
export function mergeClass(...classes: ClassValue[]) {
  return twMerge(clsx(...classes));
}
