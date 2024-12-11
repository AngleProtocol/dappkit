import clsx, { type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      p: ['p-sm/2', 'p-sm/4', 'p-sm*2', 'p-sm*4',
          'p-md/2', 'p-md/4', 'p-md*2', 'p-md*4',
          'p-lg/2', 'p-lg/4', 'p-lg*2', 'p-lg*4'],
      px: ['px-sm/2', 'px-sm/4', 'px-sm*2', 'px-sm*4',
           'px-md/2', 'px-md/4', 'px-md*2', 'px-md*4',
           'px-lg/2', 'px-lg/4', 'px-lg*2', 'px-lg*4'],
      py: ['py-sm/2', 'py-sm/4', 'py-sm*2', 'py-sm*4',
           'py-md/2', 'py-md/4', 'py-md*2', 'py-md*4',
           'py-lg/2', 'py-lg/4', 'py-lg*2', 'py-lg*4'],
      m: ['m-sm/2', 'm-sm/4', 'm-sm*2', 'm-sm*4',
          'm-md/2', 'm-md/4', 'm-md*2', 'm-md*4',
          'm-lg/2', 'm-lg/4', 'm-lg*2', 'm-lg*4'],
      mx: ['mx-sm/2', 'mx-sm/4', 'mx-sm*2', 'mx-sm*4',
           'mx-md/2', 'mx-md/4', 'mx-md*2', 'mx-md*4',
           'mx-lg/2', 'mx-lg/4', 'mx-lg*2', 'mx-lg*4'],
      my: ['my-sm/2', 'my-sm/4', 'my-sm*2', 'my-sm*4',
           'my-md/2', 'my-md/4', 'my-md*2', 'my-md*4',
           'my-lg/2', 'my-lg/4', 'my-lg*2', 'my-lg*4'],
      gap: ['gap-sm/2', 'gap-sm/4', 'gap-sm*2', 'gap-sm*4',
            'gap-md/2', 'gap-md/4', 'gap-md*2', 'gap-md*4',
            'gap-lg/2', 'gap-lg/4', 'gap-lg*2', 'gap-lg*4'],
    },
  },
});

/**
 * Merges classes together with the most compatibility possible
 * @returns finalized class
 */
export function mergeClass(...classes: ClassValue[]) {
  return twMerge(clsx(...classes));
}
