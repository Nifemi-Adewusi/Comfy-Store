import { Link, useLoaderData } from "react-router-dom";
import { formatPrice } from "../utils";
import { useDispatch, useSelector } from "react-redux";
import {
  addItemToWishlist,
  removeItemFromWishlist,
} from "../features/wishlist/wishlistSlice";
import { BsHeart, BsHeartFill } from "react-icons/bs";

const ProductsGrid = () => {
  const { products } = useLoaderData();
  const { wishlistItems } = useSelector((state) => state.wishlistState);
  const dispatch = useDispatch();

  return (
    <div className="pt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => {
        const { title, price, image } = product.attributes;
        const dollarsAmount = formatPrice(price);
        const isInWishlist = wishlistItems.find((i) => i.id === product.id);

        const toggleWishlist = (e) => {
          e.preventDefault();
          if (isInWishlist) {
            dispatch(removeItemFromWishlist({ id: product.id }));
          } else {
            dispatch(addItemToWishlist({ product }));
          }
        };

        return (
          <Link
            key={product.id}
            to={`/products/${product.id}`}
            className="card w-full shadow-xl hover:shadow-2xl transition duration-300 relative group"
          >
            <button
              className="absolute top-4 right-4 z-10 p-2 text-2xl text-secondary hover:scale-110 transition duration-300"
              onClick={toggleWishlist}
            >
              {isInWishlist ? <BsHeartFill /> : <BsHeart />}
            </button>
            <figure className="px-4 pt-4">
              <img
                src={image}
                alt={title}
                className="rounded-xl h-64 md:h-48 w-full object-cover group-hover:scale-105 transition duration-300"
              />
            </figure>
            <div className="card-body items-center text-center">
              <h2 className="card-title capitalize tracking-wider">{title}</h2>
              <span className="text-secondary">{dollarsAmount}</span>
            </div>
          </Link>
        );
      })}
    </div>
  );
};
export default ProductsGrid;
