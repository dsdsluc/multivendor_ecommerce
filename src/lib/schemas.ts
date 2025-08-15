import { ShippingFeeMethod } from "@/generated/prisma";
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

export const SubCategoryFormSchema = z.object({
  name: z
    .string()
    .min(2, { message: "SubCategory name must be at least 2 characters long." })
    .max(50, { message: "SubCategory name cannot exceed 50 characters." })
    .regex(/^[a-zA-Z0-9\s'&-]+$/, {
      message:
        "Only letters, numbers, and spaces are allowed in the SubCategory name.",
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
    .min(2, { message: "SubCategory URL must be at least 2 characters long." })
    .max(50, { message: "SubCategory URL cannot exceed 50 characters." })
    .regex(/^(?!.*(?:[-_ ]){2,})[a-zA-Z0-9_-]+$/, {
      message:
        "Only letters, numbers, hyphen (-), and underscore (_) are allowed in the SubCategory URL, and no consecutive hyphens, underscores, or spaces.",
    }),
  categoryId: z.string().uuid(),
  featured: z.boolean(),
});

// Store schema
export const StoreFormSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Store name must be at least 2 characters long." })
    .max(50, { message: "Store name cannot exceed 50 characters." })
    .regex(/^(?!.*(?:[-_& ]){2,})[a-zA-Z0-9_ &-]+$/, {
      message:
        "Only letters, numbers, spaces, hyphens (-), underscores (_), and ampersands (&) are allowed. No consecutive special characters.",
    }),

  description: z
    .string()
    .min(30, {
      message: "Store description must be at least 30 characters long.",
    })
    .max(500, { message: "Store description cannot exceed 500 characters." }),

  email: z.string().email({ message: "Invalid email format." }),

  phone: z.string().regex(/^\+?\d+$/, {
    message: "Phone number must contain only digits and may start with '+'.",
  }),

  logo: z
    .array(
      z.object({ url: z.string().url({ message: "Logo URL must be valid." }) })
    )
    .length(1, { message: "Choose exactly one logo image." }),

  cover: z
    .array(
      z.object({
        url: z.string().url({ message: "Cover image URL must be valid." }),
      })
    )
    .length(1, { message: "Choose exactly one cover image." }),

  url: z
    .string()
    .min(2, { message: "Store URL must be at least 2 characters long." })
    .max(50, { message: "Store URL cannot exceed 50 characters." })
    .regex(/^(?!.*(?:[-_ ]){2,})[a-zA-Z0-9_-]+$/, {
      message:
        "Only letters, numbers, hyphen (-), and underscore (_) are allowed. No consecutive hyphens, underscores, or spaces.",
    }),

  featured: z.boolean().default(false).optional(),

  status: z.string().default("PENDING").optional(),
});

// Product schema
export const ProductFormSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Product name must be at least 2 characters long." })
    .max(200, { message: "Product name cannot exceed 200 characters." })
    .regex(/^(?!.*(?:[-_ &' ]){2,})[a-zA-Z0-9_ '&-]+$/, {
      message:
        "Only letters, numbers, spaces, hyphens (-), underscores (_), ampersands (&), and apostrophes (') are allowed. No consecutive special characters.",
    }),

  description: z.string().min(200, {
    message: "Product description must be at least 200 characters long.",
  }),

  variantName: z
    .string()
    .min(2, { message: "Variant name must be at least 2 characters long." })
    .max(100, { message: "Variant name cannot exceed 100 characters." })
    .regex(/^(?!.*(?:[-_ ]){2,})[a-zA-Z0-9_ -]+$/, {
      message:
        "Only letters, numbers, spaces, hyphens (-), and underscores (_) are allowed. No consecutive special characters.",
    }),

  variantDescription: z.string().optional(),

  images: z
    .array(z.object({ url: z.string().url() }))
    .min(3, { message: "Please upload at least 3 product images." })
    .max(6, { message: "You can upload up to 6 product images." }),

  variantImage: z.array(z.object({ url: z.string().url() })).length(1, {
    message: "Select exactly one image for the product variant.",
  }),

  categoryId: z.string().uuid({ message: "Invalid category ID." }),

  subCategoryId: z.string().uuid({ message: "Invalid sub-category ID." }),
  offerTagId: z
    .string()
    .uuid({ message: "Product offer tag ID must be a valid UUID." })
    .optional(),

  brand: z
    .string()
    .min(2, { message: "Brand must be at least 2 characters long." })
    .max(50, { message: "Brand cannot exceed 50 characters." }),

  sku: z
    .string()
    .min(6, { message: "SKU must be at least 6 characters long." })
    .max(50, { message: "SKU cannot exceed 50 characters." }),

  weight: z.number().min(0.01, { message: "Weight must be greater than 0." }),

  keywords: z
    .array(z.string())
    .min(5, { message: "Provide at least 5 keywords." })
    .max(10, { message: "You can provide up to 10 keywords." }),

  colors: z
    .array(z.object({ color: z.string() }))
    .min(1, { message: "Please provide at least one color." })
    .refine((colors) => colors.every((c) => c.color.trim().length > 0), {
      message: "All color fields must be filled.",
    }),

  sizes: z
    .array(
      z.object({
        size: z.string(),
        quantity: z
          .number()
          .min(1, { message: "Quantity must be greater than 0." }),
        price: z
          .number()
          .min(0.01, { message: "Price must be greater than 0." }),
        discount: z.number(),
      })
    )
    .min(1, { message: "Provide at least one size." }),
  product_specs: z
    .object({
      name: z.string(),
      value: z.string(),
    })
    .array()
    .min(1, "Please provide at least one product spec.")
    .refine(
      (product_specs) =>
        product_specs.every((s) => s.name.length > 0 && s.value.length > 0),
      {
        message: "All product specs inputs must be filled correctly.",
      }
    ),
  variant_specs: z
    .object({
      name: z.string(),
      value: z.string(),
    })
    .array()
    .min(1, "Please provide at least one product variant spec.")
    .refine(
      (product_specs) =>
        product_specs.every((s) => s.name.length > 0 && s.value.length > 0),
      {
        message: "All product variant specs inputs must be filled correctly.",
      }
    ),
  questions: z
    .object({
      question: z.string(),
      answer: z.string(),
    })
    .array()
    .min(1, "Please provide at least one product question.")
    .refine(
      (questions) =>
        questions.every((q) => q.question.length > 0 && q.answer.length > 0),
      {
        message: "All product question inputs must be filled correctly.",
      }
    ),

  isSale: z.boolean().optional(),
  saleEndDate: z.string().optional(),
  freeShippingForAllCountries: z.boolean().optional(),
  freeShippingCountriesIds: z
    .object({
      id: z.string().optional(),
      label: z.string(),
      value: z.string(),
    })
    .array()
    .optional(),
  shippingFeeMethod: z.nativeEnum(ShippingFeeMethod),
});

// OfferTag form schema
export const OfferTagFormSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Category name must be at least 2 characters long." })
    .max(50, { message: "Category name cannot exceed 50 characters." })
    .regex(/^[a-zA-Z0-9\s&$.%,']+$/, {
      message:
        "Only letters, numbers, and spaces are allowed in the category name.",
    }),

  url: z
    .string()
    .min(2, { message: "Category url must be at least 2 characters long." })
    .max(50, { message: "Category url cannot exceed 50 characters." })
    .regex(/^(?!.*(?:[-_ ]){2,})[a-zA-Z0-9_-]+$/, {
      message:
        "Only letters, numbers, hyphen, and underscore are allowed in the category url, and consecutive occurrences of hyphens, underscores, or spaces are not permitted.",
    }),
});

// Store shipping details
export const StoreShippingFormSchema = z.object({
  defaultShippingService: z
    .string()
    .nonempty("Shipping service name is required.")
    .min(2, "Shipping service name must be at least 2 characters long.")
    .max(50, { message: "Shipping service name cannot exceed 50 characters." }),
  defaultShippingFeePerItem: z.number(),
  defaultShippingFeeForAdditionalItem: z.number(),
  defaultShippingFeePerKg: z.number(),
  defaultShippingFeeFixed: z.number(),
  defaultDeliveryTimeMin: z.number(),
  defaultDeliveryTimeMax: z.number(),
  returnPolicy: z.string(),
});

export const ShippingRateFormSchema = z.object({
  shippingService: z
    .string()
    .nonempty("Shipping service name is required.")
    .min(2, {
      message: "Shipping service name must be at least 2 characters long.",
    })
    .max(50, { message: "Shipping service name cannot exceed 50 characters." }),
  countryId: z.string().uuid().optional(),
  countryName: z.string().optional(),
  shippingFeePerItem: z.number(),
  shippingFeeForAdditionalItem: z.number(),
  shippingFeePerKg: z.number(),
  shippingFeeFixed: z.number(),
  deliveryTimeMin: z.number(),
  deliveryTimeMax: z.number(),
  returnPolicy: z.string().min(1, "Return policy is required."),
});

export const AddReviewSchema = z.object({
  variantName: z.string().min(1, "Variant is required."),
  variantImage: z.string().min(1, "Variant image is required."),
  rating: z.number().min(1, "Please rate this product."),
  size: z.string().min(1, "Please select a size."),
  review: z.string().min(10, "Your feedback matters! Please write a review."),
  quantity: z.string().default("1"),
  images: z
    .object({ url: z.string().min(1, "Image URL is required.") })
    .array()
    .max(3, "You can upload up to 3 images for the review."),
  color: z.string().min(1, "Color is required."),
});

export const StoreShippingSchema = z.object({
  returnPolicy: z
    .string()
    .min(1, "Return policy is required")
    .default("Return in 30 days.")
    .transform((v) => v)
    .optional(),

  defaultShippingService: z
    .string()
    .min(1, "Default shipping service is required")
    .default("International Delivery")
    .transform((v) => v)
    .optional(),

  defaultShippingFeePerItem: z
    .number()
    .default(0)
    .transform((v) => v)
    .optional(),
  defaultShippingFeeForAdditionalItem: z
    .number()
    .default(0)
    .transform((v) => v)
    .optional(),
  defaultShippingFeePerKg: z
    .number()
    .default(0)
    .transform((v) => v)
    .optional(),
  defaultShippingFeeFixed: z
    .number()
    .default(0)
    .transform((v) => v)
    .optional(),

  defaultDeliveryTimeMin: z
    .number()
    .int()
    .default(7)
    .transform((v) => v)
    .optional(),
  defaultDeliveryTimeMax: z
    .number()
    .int()
    .default(31)
    .transform((v) => v)
    .optional(),
});

export const ShippingAddressSchema = z.object({
  countryId: z
    .string()
    .min(1, { message: "Country is mandatory." })
    .uuid({ message: "Country must be a valid UUID." }),

  firstName: z
    .string()
    .min(2, { message: "First name should be at least 2 characters long." })
    .max(50, { message: "First name cannot exceed 50 characters." })
    .regex(/^[a-zA-Z]+$/, {
      message: "No special characters are allowed in name.",
    }),

  lastName: z
    .string()
    .min(2, { message: "Last name should be at least 2 characters long." })
    .max(50, { message: "Last name cannot exceed 50 characters." })
    .regex(/^[a-zA-Z]+$/, {
      message: "No special characters are allowed in name.",
    }),

  phone: z
    .string()
    .min(1, { message: "Phone number is mandatory." })
    .regex(/^\+?\d+$/, { message: "Invalid phone number format." }),

  address1: z
    .string()
    .min(5, { message: "Address line 1 should be at least 5 characters long." })
    .max(100, { message: "Address line 1 cannot exceed 100 characters." }),

  address2: z
    .string()
    .max(100, { message: "Address line 2 cannot exceed 100 characters." })
    .optional(),

  state: z
    .string()
    .min(2, { message: "State should be at least 2 characters long." })
    .max(50, { message: "State cannot exceed 50 characters." }),

  city: z
    .string()
    .min(2, { message: "City should be at least 2 characters long." })
    .max(50, { message: "City cannot exceed 50 characters." }),

  zip_code: z
    .string()
    .min(2, { message: "Zip code should be at least 2 characters long." })
    .max(10, { message: "Zip code cannot exceed 10 characters." }),

  default: z.boolean().default(false).optional(),
});

export const ApplyCouponFormSchema = z.object({
  coupon: z
    .string()
    .min(1, { message: "Coupon is required" }) // thay cho required_error
    .min(2, { message: "Coupon must be at least 2 characters." }), // validate độ dài
});

export const CouponFormSchema = z.object({
  code: z
    .string()
    .min(2, { message: "Coupon code must be at least 2 characters long." })
    .max(50, { message: "Coupon code cannot exceed 50 characters." })
    .regex(/^[a-zA-Z0-9]+$/, {
      message: "Only letters and numbers are allowed in the coupon code.",
    }),
  startDate: z.string(),
  endDate: z.string(),
  discount: z
    .number()
    .min(1, { message: "Discount must be at least 1." })
    .max(99, { message: "Discount cannot exceed 99." }),
});
