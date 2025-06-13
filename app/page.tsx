import TitleInput from "@/components/hero-section/title-input";
import ProductCard from "@/components/products/product-card";
import { getAllProducts } from "@/server/actions";

const Home = async () => {
  const allProducts = await getAllProducts();
  return (
    <div>
      <TitleInput />
      <section className="trending-section">
        <h2 className="section-text">Products you might like</h2>

        <div className="flex flex-wrap gap-x-8 gap-y-16 md:justify-start justify-center">
          {allProducts?.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
