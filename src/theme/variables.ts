/**
 * Default size array to be defined for components and tailwind classes
 */
export const sizes = ["xs", "sm", "md", "lg", "xl"] as const;
export type Size = (typeof sizes)[number];

/**
 * Default look array to be defined for components and tailwind classes
 */
export const looks = ["soft", "base", "bold", "tint", "hype"] as const;
export type Look = (typeof looks)[number];
