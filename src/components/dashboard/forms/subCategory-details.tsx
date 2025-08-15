"use client";
import { Category, SubCategory } from "@/generated/prisma/client";
import { SubCategoryFormSchema } from "@/lib/schemas";
import { useForm } from "react-hook-form";
import { AlertDialog } from "@/components/ui/alert-dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

//Form handling ultilities
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import ImageUpload from "../shared/image-upload";

// Queries
import { upsertSubCategory } from "@/queries/subCategory";

// utils
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/navigation";

interface SubCategoryDetailsProps {
  data?: SubCategory;
  categories?: Category[];
}

const SubCategoryDetails: React.FC<SubCategoryDetailsProps> = ({
  data,
  categories = [],
}) => {
  // Initializing necessary hooks
  const { toast } = useToast(); // Hook for displaying toast messages
  const router = useRouter();

  // Form hook for managing form state and validation
  const form = useForm<z.infer<typeof SubCategoryFormSchema>>({
    mode: "onChange", // Form validation mode
    resolver: zodResolver(SubCategoryFormSchema), // Zod schema resolver for validation
    defaultValues: {
      name: data?.name,
      image: data?.image ? [{ url: data.image }] : [],
      url: data?.url,
      featured: data?.featured,
      categoryId: data?.categoryId,
    },
  });

  // Loading Status based on form submission
  const isLoading = form.formState.isSubmitting;

  // Reset form values when data changes
  useEffect(() => {
    // If data is provided, set the form values
    if (data) {
      form.reset({
        name: data?.name,
        image: [{ url: data?.image }],
        url: data?.url,
        featured: data?.featured,
        categoryId: data?.categoryId,
      });
    }
  }, [data, form]);

  // Submit handler for the form
  const handleSubmit = async (
    values: z.infer<typeof SubCategoryFormSchema>
  ) => {
    try {
      console.log(values);
      //Upsert the category data
      const response = await upsertSubCategory({
        id: data?.id || uuidv4(),
        name: values.name,
        image: values.image[0].url,
        url: values.url,
        featured: values.featured,
        categoryId: values.categoryId,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      // Displaying success message
      toast({
        title: data?.id
          ? "SubCategory has been updated."
          : `Congratulations! '${response?.name}' is now created.`,
      });

      // Redirect or Refresh data
      if (data?.id) {
        router.refresh();
      } else {
        router.push("/dashboard/admin/subCategories");
      }
    } catch (error: any) {
      console.log(error);
      toast({
        variant: "destructive",
        title: "Oops!",
        description: error.toString(),
      });
    }
  };
  return (
    <AlertDialog>
      <Card className="w-full">
        <CardHeader>
          <CardTitle>SubCategory Information </CardTitle>
          <CardDescription>
            {data?.id
              ? `Update ${data.name} SubCategory information`
              : "Let's create a new SubCategory! You can edit SubCategory later from the SubCategories table or  the category page"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="space-y-4"
            >
              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <ImageUpload
                        type="profile"
                        value={field.value.map((image) => image.url)}
                        disabled={isLoading}
                        onChange={(url) => field.onChange([{ url }])}
                        onRemove={(url) =>
                          field.onChange([
                            ...field.value.filter(
                              (current) => current.url !== url
                            ),
                          ])
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel className="text-base font-medium">
                      SubCategory Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="SubCategory Name"
                        {...field}
                        disabled={isLoading}
                        className="h-11 text-base"
                      />
                    </FormControl>
                    <FormMessage className="text-sm text-red-500" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="url"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>SubCategory url</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="/subcategory-url"
                        {...field}
                        disabled={isLoading}
                        className="h-11 text-base rounded-md border border-input shadow-sm focus-visible:ring-2 focus-visible:ring-primary transition"
                      />
                    </FormControl>
                    <FormMessage className="text-sm text-red-500" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="categoryId"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Category</FormLabel>
                    <Select
                      disabled={isLoading || categories.length == 0}
                      onValueChange={field.onChange}
                      value={field.value}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue
                            defaultValue={field.value}
                            placeholder="Select a category"
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category.id} value={category.id}>
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="featured"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        disabled={isLoading}
                        // @ts-ignore
                        onCheckedChange={(checked) => field.onChange(!!checked)}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel htmlFor="featured" className="font-medium">
                        Featured
                      </FormLabel>
                      <FormDescription>
                        This SubCategory will appear on the home page
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />

              <Button type="submit" disabled={isLoading}>
                {isLoading
                  ? "loading..."
                  : data?.id
                  ? "Save SubCategory information"
                  : "Create SubCategory"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </AlertDialog>
  );
};

export default SubCategoryDetails;
