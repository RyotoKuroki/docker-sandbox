import { clsx, /*ClassValue */ } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: /*ClassValue*/clsx.ClassValue[]) {
  return twMerge(clsx(inputs));
}
