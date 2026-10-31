
import Link from "next/link";
import ProductCard from "./ProductCard";
import type { ProductsResponse } from "../../types/product";

const PAGE_SIZE = 12;

interface ProductsListProps {
  searchParams: Promise<{
    page?: string;
    q?: string;
    category?: string;
  }>;
  searchMode?: boolean;
}

export default async function ProductsList({
  searchParams,
  searchMode = false,
}: ProductsListProps) {
  const params = await searchParams;

  // Search and category parameters
  const query = searchMode ? (params.q?.trim() ?? "") : "";
  const category = !searchMode ? (params.category ?? "") : "";

  // Pagination
  const requestedPage = Number(params.page ?? "1");
  const currentPage =
    Number.isInteger(requestedPage) && requestedPage > 0
      ? requestedPage
      : 1;

  const skip = (currentPage - 1) * PAGE_SIZE;

  // Load available categories
  const categoriesResponse = await fetch(
    "https://dummyjson.com/products/category-list",
    { cache: "no-store" }
  );

  if (!categoriesResponse.ok) {
    throw new Error("Unable to load product categories.");
  }

  const categories: string[] = await categoriesResponse.json();

  // Default product data
  let data: ProductsResponse = {
    products: [],
    total: 0,
    skip,
    limit: PAGE_SIZE,
  };

  // Load products, search results, or category results
  if (!searchMode || query) {
    const apiUrl = query
      ? `https://dummyjson.com/products/search?q=${encodeURIComponent(query)}&limit=${PAGE_SIZE}&skip=${skip}`
      : category
        ? `https://dummyjson.com/products/category/${encodeURIComponent(category)}?limit=${PAGE_SIZE}&skip=${skip}`
        : `https://dummyjson.com/products?limit=${PAGE_SIZE}&skip=${skip}`;

    const response = await fetch(apiUrl, {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error("Unable to load products. Please try again.");
    }

    data = (await response.json()) as ProductsResponse;
  }

  // Pagination information
  const totalPages = Math.max(
    1,
    Math.ceil(data.total / PAGE_SIZE)
  );

  // Preserve search or category when changing pages
  const paginationUrl = (page: number) => {
    if (searchMode) {
      return `/products/search?q=${encodeURIComponent(query)}&page=${page}`;
    }

    const paginationParams = new URLSearchParams();
    paginationParams.set("page", String(page));

    if (category) {
      paginationParams.set("category", category);
    }

    return `/products?${paginationParams.toString()}`;
  };

  return (
    <>
      {/* Catalogue heading */}
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4 border-b border-[#e9e6dc] pb-5">
        <div>
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-[#bd795c]">
            {searchMode ? "Find something you love" : "The collection"}
          </p>

          <h1 className="text-3xl font-bold tracking-tight text-[#294b3c]">
            {searchMode ? "Search Products" : "Our Products"}
          </h1>
        </div>

        <span className="rounded-full bg-[#efeee7] px-4 py-2 text-sm font-semibold text-[#294b3c]">
          {data.total} products
        </span>
      </div>

      {/* Search form */}
      <div className="mb-10">
        <form
          action="/products/search"
          method="GET"
          className="mx-auto flex max-w-2xl items-center gap-3 rounded-full border border-[#e9e6dc] bg-white p-2 pl-5 shadow-sm"
        >
          <span className="text-xl text-[#777b70]">⌕</span>

          <input
            type="search"
            name="q"
            defaultValue={query}
            placeholder="Search for a product..."
            aria-label="Search products"
            required
            className="min-w-0 flex-1 bg-transparent py-2 text-sm text-[#294b3c] outline-none placeholder:text-[#aaa99f]"
          />

          <button
            type="submit"
            className="rounded-full bg-[#294b3c] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#bd795c]"
          >
            Search
          </button>
        </form>

        {searchMode && query && (
          <div className="mx-auto mt-3 flex max-w-2xl items-center justify-between text-sm text-[#777b70]">
            <p>
              Results for{" "}
              <strong className="text-[#294b3c]">"{query}"</strong>
            </p>

            <Link
              href="/products"
              className="font-semibold text-[#bd795c] hover:underline"
            >
              Clear search
            </Link>
          </div>
        )}
      </div>

      {/* Category filter - catalogue only */}
      {!searchMode && (
        <div className="mb-10 flex flex-wrap items-center gap-4">
          <label
            htmlFor="category"
            className="text-sm font-semibold text-[#294b3c]"
          >
            Filter by category:
          </label>

          <form action="/products" method="GET">
            <select
              id="category"
              name="category"
              defaultValue={category}
              className="min-w-52 rounded-full border border-[#e9e6dc] bg-white px-5 py-3 text-sm text-[#294b3c] outline-none focus:border-[#294b3c]"
            >
              <option value="">All categories</option>

              {categories.map((item) => (
                <option key={item} value={item}>
                  {item.replaceAll("-", " ")}
                </option>
              ))}
            </select>

            <button
              type="submit"
              className="ml-2 rounded-full bg-[#294b3c] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#bd795c]"
            >
              Apply
            </button>
          </form>

          {category && (
            <Link
              href="/products"
              className="text-sm font-semibold text-[#bd795c] hover:underline"
            >
              Clear filter
            </Link>
          )}
        </div>
      )}

      {/* Search results information */}
      {searchMode && query && (
        <p className="mb-6 text-sm text-[#777b70]">
          {data.total} matching products found
        </p>
      )}

      {/* Category information */}
      {!searchMode && category && (
        <p className="mb-6 text-sm text-[#777b70]">
          Showing products in{" "}
          <strong className="capitalize text-[#294b3c]">
            {category.replaceAll("-", " ")}
          </strong>
        </p>
      )}

      {/* Product grid or empty state */}
      {data.products.length > 0 ? (
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {data.products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl bg-[#efeee7] px-6 py-16 text-center">
          <p className="mb-3 text-4xl text-[#bd795c]">⌕</p>

          <h2 className="text-xl font-bold text-[#294b3c]">
            {searchMode && !query
              ? "Start your search"
              : "No products found"}
          </h2>

          <p className="mt-2 text-sm text-[#777b70]">
            {searchMode && !query
              ? "Enter a product name in the search box above."
              : query
                ? `We couldn't find products matching "${query}". Try another search.`
                : "There are no products in this category."}
          </p>

          {(query || category) && (
            <Link
              href="/products"
              className="mt-5 inline-block rounded-full bg-[#294b3c] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#bd795c]"
            >
              Back to catalogue
            </Link>
          )}
        </div>
      )}

      {/* Pagination */}
      {data.products.length > 0 && (
        <div className="mt-14 flex flex-col items-center justify-between gap-5 border-t border-[#e9e6dc] pt-6 sm:flex-row">
          <p className="text-sm text-[#777b70]">
            Page{" "}
            <strong className="text-[#294b3c]">{currentPage}</strong> of{" "}
            <strong className="text-[#294b3c]">{totalPages}</strong>

            <span className="mt-1 block text-xs">
              {data.total} products in total
            </span>
          </p>

          <div className="flex items-center gap-3">
            {currentPage > 1 ? (
              <Link
                href={paginationUrl(currentPage - 1)}
                className="rounded-full border border-[#294b3c] px-5 py-2.5 text-sm font-semibold text-[#294b3c] transition hover:bg-[#294b3c] hover:text-white"
              >
                ← Previous
              </Link>
            ) : (
              <span className="cursor-not-allowed rounded-full border border-[#e9e6dc] px-5 py-2.5 text-sm text-[#aaa99f]">
                ← Previous
              </span>
            )}

            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#294b3c] text-sm font-bold text-white">
              {currentPage}
            </span>

            {currentPage < totalPages ? (
              <Link
                href={paginationUrl(currentPage + 1)}
                className="rounded-full bg-[#294b3c] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#bd795c]"
              >
                Next →
              </Link>
            ) : (
              <span className="cursor-not-allowed rounded-full border border-[#e9e6dc] px-5 py-2.5 text-sm text-[#aaa99f]">
                Next →
              </span>
            )}
          </div>
        </div>
      )}
    </>
  );
}
