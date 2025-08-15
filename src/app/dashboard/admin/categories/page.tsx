import CategoryDetails from "@/components/dashboard/forms/category-details";
import DataTable from "@/components/ui/data-table";
import { getAllCategories } from "@/queries/category";
import { Plus } from "lucide-react";
import { columns } from "./columns";

export default async function AdminCateregoriesPage() {
  const categories = await getAllCategories();
  if (!categories) return null;
  return (
    <DataTable
      actionButtonText={
        <>
          <Plus size={15} />
          Create Category
        </>
      }
      modalChildren={<CategoryDetails />}
      filterValue="name"
      data={categories}
      searchPlaceholder="Search category name"
      newTabLink="/dashboard/admin/categories/new"
      columns={columns}
    />
  );
}
