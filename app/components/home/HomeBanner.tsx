"use client";
import CustomCarousel from "../carousel/CustomCarousel";
import MainCarouselItem from "../carousel/MainCarouselItem";
import HomeSale from "./HomeSale";
import HomeCategories from "./HomeCategories";

const HomeBanner = () => {
  const carouselImages = [
    { src: "/watame.png", name: "watame1" },
    { src: "/watame2.jpg", name: "watame2" },
    { src: "/watame3.jpg", name: "watame3" },
  ];

  return (
    <div className=" border mb-8 h-auto bg-slate-50 ">
      <div className="flex gap-8 h-[400px]">
        <div className="w-2/3 border">
          <CustomCarousel
            height={400}
            showArrows={true}
            swipeable={true}
            infiniteLoop={true}
            autoPlay={false} //set to true
            showStatus={false}
            stopOnHover={true}
          >
            {carouselImages.map((image) => {
              return (
                // K
                <div key={image.name}>
                  <MainCarouselItem image={image} height={400} />
                </div>
              );
            })}
          </CustomCarousel>
        </div>
        <div className="w-1/3 border  flex flex-col gap-5 text-center align-middle">
          <HomeSale text="Promoción 1 " />
          <HomeSale text="Promoción 2 " />
        </div>
      </div>
      <div className="mt-5">
        <HomeCategories />
      </div>
    </div>
  );
};

export default HomeBanner;
