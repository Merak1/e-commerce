import { categories1, categoryButtons } from "@/utils/categories";
import Slider from "react-slick";
import Category from "../home/Category";
import useWindowDimensions from "@/hooks/useWindowDimensions";
import { useEffect, useState } from "react";
import {
  MdKeyboardDoubleArrowLeft,
  MdKeyboardDoubleArrowRight,
} from "react-icons/md";

const HomeCategories = () => {
  const { height, width } = useWindowDimensions();
  const [slidesToShow, setSlidesToShow] = useState(6);
  const [dots, setDots] = useState(true);
  useEffect(() => {
    if (width) {
      if (width <= 1440) {
        setSlidesToShow(6);
        setDots(true);
      }
      if (width <= 1024) {
        setSlidesToShow(5);
        setDots(true);
      }
      if (width <= 768) {
        setSlidesToShow(4);
        setDots(true);
      }
      if (width <= 425) {
        setDots(false);
        setSlidesToShow(2);
      }
    }
  }, [width]);

  const CustomNextArrow = (props: any) => {
    const { className, style, onClick } = props;
    return (
      <button
        onClick={onClick}
        className=" bg-white active:bg-jrl active:border-0 
                  outline-none mx-[5px] bg-opacity-40 absolute z-30
                  right-[0px] top-[50%] border rounded-full p-1 "
      >
        <MdKeyboardDoubleArrowRight size={30} />
      </button>
    );
  };
  const CustomPrevArrow = (props: any) => {
    const { className, style, onClick } = props;
    return (
      <button
        onClick={onClick}
        className=" bg-white active:bg-jrl active:border-0 
                  outline-none mx-[5px] bg-opacity-40 absolute z-30
                  left-[0px] top-[50%] border rounded-full p-1"
      >
        <MdKeyboardDoubleArrowLeft size={30} />
      </button>
    );
  };

  const settings = {
    dots: dots,
    infinite: true,
    speed: 1000,
    slidesToShow: slidesToShow,
    slidesToScroll: 1,
    nextArrow: <CustomNextArrow />,
    prevArrow: <CustomPrevArrow />,
  };
  return (
    <div className="slider-container">
      <Slider {...settings}>
        {categoryButtons.map((item) => {
          return (
            <div key={item.label} className="col-span ">
              <Category name={item.label} />
            </div>
          );
        })}
      </Slider>
    </div>
  );
};

export default HomeCategories;
