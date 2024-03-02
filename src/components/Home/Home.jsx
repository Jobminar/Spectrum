import BlogPreview from "./BlogPreview";
import ExploreSection from "./Exploresection";
import Finddiamonds from "./Findgems";
import GemstoneCategories from "./Gemscategeories";
import Mainintro from "./mainintro";
import Gemsgewelry from "./shopbyme";

const Home = () => {
  return (
    <>
      <Mainintro />
      <GemstoneCategories />
      {/* <Finddiamonds /> */}
      <ExploreSection />
      <Gemsgewelry />
      <BlogPreview />
    </>
  );
};

export default Home;
