
import Image from "next/image";
import Link from "next/link";
import type { Product } from "../../types/product";
import FavoriteButton from "../../components/FavoriteButton";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <article className="product-card group flex h-full flex-col">

      {/* Product image */}
      <div className="product-image-area relative">
        <Link
          href={`/products/${product.id}`}
          className="relative block"
        >
          <span className="product-category">
            {product.category}
          </span>

          <div className="relative h-64 w-full">
            <Image
              src={product.thumbnail}
              alt={product.title}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              className="object-contain p-7 transition-transform duration-500 group-hover:scale-110"
            />
          </div>

          <span className="image-arrow">↗</span>
        </Link>

        {/* Favorite button */}
        <FavoriteButton product={product} />
      </div>

      {/* Product information */}
      <div className="flex flex-1 flex-col px-2 pb-3 pt-5">

        <h2 className="product-title">
          {product.title}
        </h2>

        <p className="product-description">
          {product.description}
        </p>

        <div className="mt-auto flex items-center justify-between pt-5">

          <p className="product-price">
            ${product.price.toFixed(2)}
          </p>

          <Link
            href={`/products/${product.id}`}
            className="product-button"
          >
            Discover <span>→</span>
          </Link>

        </div>
      </div>
    </article>
  );
}
