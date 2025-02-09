import { useParams } from "react-router-dom";
import { RefreshCcw } from "lucide-react";
import { useCart } from "../contexts/CartContext";
import { useFetch } from "../utils/hooks/useFetch";

const ProductDetails = () => {
  const { id } = useParams();
  const { cart, addToCart } = useCart();
  
  const {
    data: product,
    isLoading,
    error,
    refetch,
  } = useFetch(`https://fakestoreapi.com/products/${id}`);
  
  const isProductInCart = cart.some((item) => item.id == id);

  if (isLoading) {
    return (
      <section className="h-screen flex justify-center items-center">
        <div className="loader">Loading...</div> {/* Optional Spinner */}
      </section>
    );
  }

  if (error) {
    return (
      <section className="h-screen flex justify-center items-center">
        <div>
          <p className="text-red-500 mb-2">{error.message}</p>
          <button
            onClick={refetch}
            className="border rounded-md py-2 px-3 bg-slate-100"
          >
            Try again
            <RefreshCcw className="ml-2 inline-block w-5" />
          </button>
        </div>
      </section>
    );
  }

  if (!product) {
    return (
      <section className="h-screen flex justify-center items-center">
        <p className="text-gray-600">Product not found.</p>
      </section>
    );
  }

  const { title, price, description, image } = product;

  return (
    <section className="pt-[450px] md:pt-32 pb-[400px] md:pb-12 lg:py-32 h-screen flex items-center">
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row items-center">
          <div className="flex flex-1 justify-center items-center mb-8 lg:mb-0">
            <img
              className="max-w-[200px] lg:max-w-xs"
              src={image || "/default-image.jpg"}
              alt={title || "Product Image"}
            />
          </div>
          <div className="flex-1 text-center lg:text-left">
            <h1 className="text-[26px] font-medium mb-2 max-w-[450px] mx-auto lg:mx-0">
              {title || "No Title Available"}
            </h1>
            <div className="text-2xl text-red-500 font-medium mb-6">
              $ {price || "0.00"}
            </div>
            <p className="mb-8">{description || "No description available."}</p>
            <button
              disabled={isProductInCart}
              onClick={() => addToCart(product)}
              className="disabled:bg-gray-200 bg-primary py-4 px-8 disabled:text-gray-600 text-white"
            >
              {isProductInCart ? "Already in Cart" : "Add to Cart"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetails;
