import DataTable from "@/components/ui/data-table";
import { getAllStoreProducts } from "@/queries/product";
import { columns } from "./columns";
import ProductDetails from "@/components/dashboard/forms/product-details";
import { getAllCategories } from "@/queries/category";
import { Plus } from "lucide-react";

export default async function SellerProductsPage({
  params,
}: {
  params: { storeUrl: string };
}) {
  const products = await getAllStoreProducts(params.storeUrl);
  const categories = await getAllCategories();
  return (
    <DataTable
      actionButtonText={
        <>
          <Plus size={15} />
          Create Category
        </>
      }
      modalChildren={
        <ProductDetails storeUrl={params.storeUrl} categories={categories} />
      }
      filterValue="name"
      newTabLink={`/dashboard/seller/stores/${params.storeUrl}/products/new`}
      data={products}
      columns={columns}
      searchPlaceholder="Search product name...."
    />
  );
}
