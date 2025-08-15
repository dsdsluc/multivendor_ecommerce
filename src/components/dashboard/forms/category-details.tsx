"use client";
import { Category } from "@/generated/prisma/client";
import { CategoryFormSchema } from "@/lib/schemas";
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

//Form handling ultilities
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import ImageUpload from "../shared/image-upload";
// Queries
import { upsertCategory } from "@/queries/category";

// utils
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/navigation";

interface CategoryDetailsProps {
  data?: Category;
}

const CategoryDetails: React.FC<CategoryDetailsProps> = ({ data }) => {
  // Initializing necessary hooks
  const { toast } = useToast(); // Hook for displaying toast messages
  const router = useRouter();

  // Form hook for managing form state and validation
  const form = useForm<z.infer<typeof CategoryFormSchema>>({
    mode: "onChange", // Form validation mode
    resolver: zodResolver(CategoryFormSchema), // Zod schema resolver for validation
    defaultValues: {
      name: data?.name,
      image: data?.image ? [{ url: data.image }] : [],
      url: data?.url,
      featured: data?.featured,
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
      });
    }
  }, [data, form]);

  // Submit handler for the form
  const handleSubmit = async (values: z.infer<typeof CategoryFormSchema>) => {
    try {
      //Upsert the category data
      const response = await upsertCategory({
        id: data?.id || uuidv4(),
        name: values.name,
        image: values.image[0].url,
        url: values.url,
        featured: values.featured,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      // Displaying success message
      toast({
        title: data?.id
          ? "Category has been updated."
          : `Congratulations! '${response?.name}' is now created.`,
      });

      // Redirect or Refresh data
      if (data?.id) {
        router.refresh();
      } else {
        router.push("/dashboard/admin/categories");
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
          <CardTitle>Category Information </CardTitle>
          <CardDescription>
            {data?.id
              ? `Update ${data.name} category information`
              : "Let's create a new category! You can edit category later from the categories table or  the category page"}
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
                      Category Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Category Name"
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
                    <FormLabel>Category url</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="/category-url"
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
                        This Category will appear on the home page
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isLoading}>
                {isLoading
                  ? "loading..."
                  : data?.id
                  ? "Save category information"
                  : "Create category"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </AlertDialog>
  );
};

export default CategoryDetails;
