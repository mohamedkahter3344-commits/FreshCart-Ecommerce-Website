import { getAllProducts } from "../apis/products";
import { getAllCategories } from "@/apis/AllGategory";
import CategorySlider from "./_components/CategorySlider/CategorySlider";
import { Slider } from "./_components/MainSlider/Slider";
import ProductCard from "./_components/ProuductCart/ProductCard";
import type { Product } from "@/interface/product.t";
import type { Category } from "@/interface/singleProduct.t";

const Products = async () => {
  const [{ data: products }, categories] = await Promise.all([
    getAllProducts(),
    getAllCategories(),
  ]);

  return (
    <div className="mx-auto w-[90%] py-10">
      <Slider />

      <CategorySlider categories={categories} />

      <div className="cards grid grid-cols-12 gap-3">
        {products?.map((productItem: Product, idx: number) => (
          <div
            key={productItem._id}
            data-aos="fade-up"
            data-aos-delay={idx * 50}
            className="col-span-12 md:col-span-4 lg:col-span-3"
          >
            <ProductCard singleProduct={productItem} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;