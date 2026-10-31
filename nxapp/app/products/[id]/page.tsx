
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import type { Product } from "../../../types/product";
import FavoriteButton from "../../../components/FavoriteButton";

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

async function ProductDetails({ params }: ProductPageProps) {
  try {
    const { id } = await params;

    const response = await fetch(
      `https://dummyjson.com/products/${id}`,
      { cache: "no-store" }
    );

    if (!response.ok) {
      throw new Error("Product not found");
    }

    const product: Product = await response.json();

    return (
      <main className="min-h-screen bg-[#f8f7f2] px-5 py-10 sm:px-8">
        <div className="mx-auto max-w-7xl">

          {/* Back navigation */}
          <Link
            href="/products"
            className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-[#294b3c] transition hover:text-[#bd795c]"
          >
            <span>←</span> Back to catalogue
          </Link>

          {/* Main product section */}
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">

            {/* Images */}
            <div>
              <div className="relative flex h-[420px] items-center justify-center overflow-hidden rounded-3xl bg-[#efeee7] p-8">
                <Image
                  src={product.thumbnail}
                  alt={product.title}
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-contain p-8"
                />

                <span className="absolute left-5 top-5 z-10 rounded-full bg-white/90 px-4 py-2 text-xs font-bold uppercase tracking-wider text-[#294b3c]">
                  {product.category}
                </span>
              </div>

              {/* Additional images */}
              {product.images.length > 0 && (
                <div className="mt-4 grid grid-cols-3 gap-3">
                  {product.images.map((image, index) => (
                    <div
                      key={`${image}-${index}`}
                      className="relative h-28 overflow-hidden rounded-2xl bg-[#efeee7] transition hover:bg-[#e8e6dc]"
                    >
                      <Image
                        src={image}
                        alt={`${product.title} image ${index + 1}`}
                        fill
                        sizes="150px"
                        className="object-contain p-3"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Product information */}
            <div className="flex flex-col py-2">

              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#bd795c]">
                Product details
              </p>

              <h1 className="mt-4 text-3xl font-extrabold leading-tight tracking-tight text-[#294b3c] sm:text-4xl">
                {product.title}
              </h1>

              <p className="mt-5 text-base leading-8 text-[#777b70]">
                {product.description}
              </p>

              {/* Price */}
              <div className="mt-7 border-y border-[#e9e6dc] py-6">
                <div className="flex flex-wrap items-center gap-4">
                  <span className="text-4xl font-extrabold text-[#294b3c]">
                    ${product.price.toFixed(2)}
                  </span>

                  {product.discountPercentage > 0 && (
                    <span className="rounded-full bg-[#f3e6df] px-3 py-1.5 text-sm font-bold text-[#bd795c]">
                      {product.discountPercentage.toFixed(1)}% OFF
                    </span>
                  )}
                </div>
                <div className="mt-5">
                  <FavoriteButton product={product} variant="detail" />
                </div>

                <p className="mt-3 text-sm text-[#777b70]">
                  ⭐ {product.rating} / 5
                  <span className="mx-2">·</span>
                  {product.stock} items in stock
                </p>
              </div>

              {/* Quick information */}
              <div className="mt-6 grid grid-cols-2 gap-4">
                <div className="rounded-2xl bg-[#efeee7] p-4">
                  <p className="text-xs uppercase tracking-wider text-[#777b70]">
                    Brand
                  </p>
                  <p className="mt-2 font-bold text-[#294b3c]">
                    {product.brand || "Not specified"}
                  </p>
                </div>

                <div className="rounded-2xl bg-[#efeee7] p-4">
                  <p className="text-xs uppercase tracking-wider text-[#777b70]">
                    Availability
                  </p>
                  <p className="mt-2 font-bold text-[#294b3c]">
                    {product.availabilityStatus}
                  </p>
                </div>

                <div className="rounded-2xl bg-[#efeee7] p-4">
                  <p className="text-xs uppercase tracking-wider text-[#777b70]">
                    SKU
                  </p>
                  <p className="mt-2 font-bold text-[#294b3c]">
                    {product.sku}
                  </p>
                </div>

                <div className="rounded-2xl bg-[#efeee7] p-4">
                  <p className="text-xs uppercase tracking-wider text-[#777b70]">
                    Minimum order
                  </p>
                  <p className="mt-2 font-bold text-[#294b3c]">
                    {product.minimumOrderQuantity}
                  </p>
                </div>
              </div>

              {/* Specifications */}
              <section className="mt-9">
                <h2 className="mb-4 text-xl font-bold text-[#294b3c]">
                  Specifications
                </h2>

                <div className="overflow-hidden rounded-2xl border border-[#e9e6dc]">
                  {[
                    ["Weight", `${product.weight}`],
                    ["Width", `${product.dimensions.width}`],
                    ["Height", `${product.dimensions.height}`],
                    ["Depth", `${product.dimensions.depth}`],
                  ].map(([label, value]) => (
                    <div
                      key={label}
                      className="flex justify-between gap-4 border-b border-[#e9e6dc] px-5 py-3 text-sm last:border-b-0"
                    >
                      <span className="text-[#777b70]">{label}</span>
                      <span className="font-semibold text-[#294b3c]">
                        {value}
                      </span>
                    </div>
                  ))}
                </div>
              </section>

              {/* Additional information */}
              <section className="mt-9">
                <h2 className="mb-4 text-xl font-bold text-[#294b3c]">
                  Additional information
                </h2>

                <div className="space-y-3 text-sm leading-6 text-[#777b70]">
                  <p>
                    <strong className="text-[#294b3c]">Warranty:</strong>{" "}
                    {product.warrantyInformation}
                  </p>
                  <p>
                    <strong className="text-[#294b3c]">Shipping:</strong>{" "}
                    {product.shippingInformation}
                  </p>
                  <p>
                    <strong className="text-[#294b3c]">Return policy:</strong>{" "}
                    {product.returnPolicy}
                  </p>
                  <p>
                    <strong className="text-[#294b3c]">Tags:</strong>{" "}
                    {product.tags.join(", ")}
                  </p>
                </div>
              </section>
            </div>
          </div>

          {/* Customer reviews */}
          <section className="mt-16 border-t border-[#e9e6dc] pt-10">
            <div className="mb-7">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#bd795c]">
                Customer feedback
              </p>
              <h2 className="mt-2 text-2xl font-bold text-[#294b3c]">
                Customer Reviews
              </h2>
            </div>

            {product.reviews.length > 0 ? (
              <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                {product.reviews.map((review, index) => (
                  <article
                    key={`${review.reviewerEmail}-${index}`}
                    className="rounded-2xl border border-[#e9e6dc] bg-white p-6"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <h3 className="font-bold text-[#294b3c]">
                        {review.reviewerName}
                      </h3>
                      <span className="text-sm font-semibold text-[#bd795c]">
                        ⭐ {review.rating}/5
                      </span>
                    </div>

                    <p className="my-4 text-sm leading-7 text-[#777b70]">
                      {review.comment}
                    </p>

                    <p className="text-xs text-[#aaa99f]">
                      {review.date}
                    </p>
                  </article>
                ))}
              </div>
            ) : (
              <p className="text-sm text-[#777b70]">
                No reviews available.
              </p>
            )}
          </section>

          {/* Product metadata */}
          <section className="mt-14 border-t border-[#e9e6dc] pt-10">
            <h2 className="mb-6 text-2xl font-bold text-[#294b3c]">
              Product Metadata
            </h2>

            <div className="flex flex-col items-start gap-8 rounded-2xl bg-[#efeee7] p-6 sm:flex-row sm:items-center">
              <div className="space-y-3 text-sm text-[#777b70]">
                <p>
                  <strong className="text-[#294b3c]">Barcode:</strong>{" "}
                  {product.meta.barcode}
                </p>
                <p>
                  <strong className="text-[#294b3c]">Created:</strong>{" "}
                  {product.meta.createdAt}
                </p>
                <p>
                  <strong className="text-[#294b3c]">Updated:</strong>{" "}
                  {product.meta.updatedAt}
                </p>
              </div>

              <div className="rounded-xl bg-white p-3">
                <Image
                  src={product.meta.qrCode}
                  alt="Product QR code"
                  width={150}
                  height={150}
                />
              </div>
            </div>
          </section>

          {/* Back to catalogue */}
          <div className="mt-12 text-center">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 rounded-full bg-[#294b3c] px-7 py-3 font-semibold text-white transition hover:bg-[#bd795c]"
            >
              ← Continue exploring
            </Link>
          </div>

        </div>
      </main>
    );
  } catch {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center bg-[#f8f7f2] px-6 text-center">
        <p className="text-lg font-semibold text-[#294b3c]">
          Unable to load product details.
        </p>
        <p className="mt-2 text-sm text-[#777b70]">
          Please check the product ID or try again.
        </p>
        <Link
          href="/products"
          className="mt-6 rounded-full bg-[#294b3c] px-6 py-3 font-semibold text-white transition hover:bg-[#bd795c]"
        >
          Back to catalogue
        </Link>
      </main>
    );
  }
}

export default function ProductPage({ params }: ProductPageProps) {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen flex-col items-center justify-center bg-[#f8f7f2]">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#e9e6dc] border-t-[#294b3c]" />
          <p className="mt-4 text-sm text-[#777b70]">
            Loading product details...
          </p>
        </div>
      }
    >
      <ProductDetails params={params} />
    </Suspense>
  );
}
