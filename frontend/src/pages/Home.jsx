import LatestProducts from "../components/common/LatestProducts";
import FeaturedProducts from "../components/common/FeaturedProducts";
import Hero from "../components/common/Hero";
import Layout from "../components/common/Layout";

const Home = () => {
  return (
    <>
      <Layout>
        <Hero />
        <LatestProducts />
        <FeaturedProducts />
      </Layout>
    </>
  );
};

export default Home;
