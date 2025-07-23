import * as z from "zod";

// Category form schema
export const CategoryFormSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Category name must be at least 2 characters long." })
    .max(50, { message: "Category name cannot exceed 50 characters." })
    .regex(/^[a-zA-Z0-9\s'&-]+$/, {
      message:
        "Only letters, numbers, and spaces are allowed in the category name.",
    }),

  image: z
    .array(
      z.object({
        url: z.string().url({ message: "Image URL must be valid." }),
      })
    )
    .length(1, { message: "Choose exactly one category image." }),

  url: z
    .string()
    .min(2, { message: "Category URL must be at least 2 characters long." })
    .max(50, { message: "Category URL cannot exceed 50 characters." })
    .regex(/^(?!.*(?:[-_ ]){2,})[a-zA-Z0-9_-]+$/, {
      message:
        "Only letters, numbers, hyphen (-), and underscore (_) are allowed in the category URL, and no consecutive hyphens, underscores, or spaces.",
    }),

  featured: z.boolean(),
});
