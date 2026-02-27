import { useSelector } from "react-redux";
import { SectionTitle } from "../components";

import { Link } from "react-router-dom";
import ProductsGrid from "../components/ProductsGrid";

const Wishlist = () => {
  const { wishlistItems } = useSelector((state) => state.wishlistState);

  if (wishlistItems.length === 0) {
    return <SectionTitle text="Your wishlist is empty" />;
  }

  return (
    <>
      <SectionTitle text="Your Wishlist" />
      <div className="pt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {wishlistItems.map((product) => {
          const { title, price, image } = product.attributes;
          // Reuse existing grid functionality or creating a custom one?
          // For now, let's reuse a simplified card structure similar to ProductsGrid but with remove button
          // Actually, sticking to the plan, I should probably reuse ProductsGrid but it expects data from loader.
          // Let's create a custom display here for now since ProductsGrid wraps useLoaderData which we don't have here.
          // Wait, I can pass data to ProductsGrid? No, it uses useLoaderData internally.
          // I should PROBABLY refactor ProductsGrid to accept props OR just copy the card logic here.
          // Copying logic is safer for now to avoid breaking existing pages.

          return (
            <Link
              key={product.id}
              to={`/products/${product.id}`}
              className="card w-full shadow-xl hover:shadow-2xl transition duration-300"
            >
              <figure className="px-4 pt-4">
                <img
                  src={image}
                  alt={title}
                  className="rounded-xl h-64 md:h-48 w-full object-cover"
                />
              </figure>
              <div className="card-body items-center text-center">
                <h2 className="card-title capitalize tracking-wider">
                  {title}
                </h2>
                <span className="text-secondary">
                  {(price / 100).toLocaleString("en-US", {
                    style: "currency",
                    currency: "NGN",
                  })}
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </>
  );
};
export default Wishlist;
