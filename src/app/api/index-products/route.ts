import { db } from "@/lib/db";
import client from "@/lib/elasticsearch";
import { NextResponse } from "next/server";

// Next.js 14+: đảm bảo API route chạy trên Node runtime
export const runtime = "nodejs";

export async function POST() {
  try {
    // Kiểm tra environment variables để tránh crash build
    if (!process.env.DATABASE_URL) {
      return NextResponse.json(
        { message: "DATABASE_URL is not defined" },
        { status: 500 }
      );
    }
    if (!process.env.ELASTICSEARCH_URL) {
      return NextResponse.json(
        { message: "ELASTICSEARCH_URL is not defined" },
        { status: 500 }
      );
    }

    // Lấy sản phẩm + variants + images
    const products = await db.product.findMany({
      include: {
        variants: {
          include: {
            images: true,
          },
        },
      },
    });

    if (!products.length) {
      return NextResponse.json(
        { message: "No products found to index" },
        { status: 200 }
      );
    }

    // Chuẩn bị body cho Elasticsearch bulk
    const body = products.flatMap((product) =>
      product.variants.flatMap((variant) => {
        const image =
          variant.images.find((img) => img.order === 1) || variant.images[0];

        return [
          { index: { _index: "products", _id: variant.id } },
          {
            name: `${product.name} · ${variant.variantName}`,
            link: `/product/${product.slug}?variant=${variant.slug}`,
            image: image ? image.url : "",
          },
        ];
      })
    );

    // Thực thi bulk request
    const bulkResponse = await client.bulk({ refresh: true, body });

    if (bulkResponse.errors) {
      console.error("Elasticsearch bulk errors:", bulkResponse.items);
      return NextResponse.json(
        { message: "Failed to index some products" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "Products indexed successfully", data: bulkResponse },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Indexing error:", error);
    return NextResponse.json(
      { message: "Unexpected error: " + error.message },
      { status: 500 }
    );
  }
}
