
import { Suspense } from "react";
import ProductsList from "./ProductsList";

interface ProductsPageProps {
  searchParams: Promise<{
    page?: string;
  }>;
}

export default function ProductsPage({
  searchParams,
}: ProductsPageProps) {
  return (
    <main className="min-h-screen bg-[#f8f7f2] px-5 py-10 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <Suspense
          fallback={
            <div className="py-20 text-center" role="status">
              <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-[#e9e6dc] border-t-[#294b3c]" />
              <p className="mt-4 text-sm text-[#777b70]">
                Loading products...
              </p>
            </div>
          }
        >
          <ProductsList searchParams={searchParams} />
        </Suspense>
      </div>
    </main>
  );
}
