import Hero from "./components/HomePage/Hero/Hero";
import Section from "./components/layout/Section/Section";
import BrandHighlight from "./components/HomePage/BrandHighlight/BrandHighlight";
import CategoryCards from "./components/HomePage/CategoryCards/CategoryCards";
import ProductCardsSlider from "./components/HomePage/ProductCardsSlider/ProductCardsSlider";


export default function Home() {

  return (
    <div id='homepage' className="">
      <Hero/>
      <div className="flex flex-col max-[482px]:gap-0 gap-10 px-[200px] max-2xl:px-[50px] max-lg:px-[16px] ">
         <Section>
            <ProductCardsSlider/>
        </Section>

        <Section>
          <CategoryCards/>  
        </Section> 

        <Section style="max-[482px]:mt-16 mt-6 mb-14">
          <BrandHighlight/>
        </Section>
      </div>
  </div>
  );
} 
