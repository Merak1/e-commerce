import Image from "next/image";
import React from "react";
import {
  MdDoubleArrow,
  MdKeyboardDoubleArrowLeft,
  MdKeyboardDoubleArrowRight,
} from "react-icons/md";
import { Carousel } from "react-responsive-carousel";

interface CustomCarouselProps {
  height: number;
  children: React.ReactNode | any;
  showArrows?: boolean;
  showStatus?: boolean;
  showIndicators?: boolean;
  infiniteLoop?: boolean;
  showThumbs?: boolean;
  useKeyboardArrows?: boolean;
  autoPlay?: boolean;
  stopOnHover?: boolean;
  swipeable?: boolean;
  dynamicHeight?: boolean;
  emulateTouch?: boolean;
  autoFocus?: boolean;
  thumbWidth?: number;
  selectedItem?: number;
  interval?: number;
  transitionTime?: number;
  swipeScrollTolerance?: number;
  ariaLabel?: string;
}
const CustomCarousel: React.FC<CustomCarouselProps> = ({
  height,
  children,
  showArrows,
  showStatus,
  showIndicators,
  infiniteLoop,
  showThumbs,
  useKeyboardArrows,
  autoPlay,
  stopOnHover,
  swipeable,
  dynamicHeight,
  emulateTouch,
  autoFocus,
  thumbWidth,
  selectedItem,
  interval,
  transitionTime,
  swipeScrollTolerance,
  ariaLabel,
}) => {
  return (
    <div className=" h-full">
      <Carousel
        showArrows={showArrows}
        showStatus={showStatus}
        showIndicators={showIndicators}
        infiniteLoop={infiniteLoop}
        showThumbs={showThumbs}
        useKeyboardArrows={useKeyboardArrows}
        autoPlay={autoPlay}
        stopOnHover={stopOnHover}
        swipeable={swipeable}
        dynamicHeight={dynamicHeight}
        emulateTouch={emulateTouch}
        autoFocus={autoFocus}
        thumbWidth={thumbWidth}
        selectedItem={selectedItem}
        interval={interval}
        transitionTime={transitionTime}
        swipeScrollTolerance={swipeScrollTolerance}
        ariaLabel={ariaLabel}
        renderArrowNext={(clickHandler, hasNext) => {
          return (
            hasNext && (
              <button
                onClick={clickHandler}
                className=" bg-white active:bg-jrl active:border-0 
                 outline-none mx-[5px] bg-opacity-40 absolute z-30 right-[0px] top-[50%] border rounded-full p-2 "
              >
                <MdKeyboardDoubleArrowRight size={30} />
              </button>
            )
          );
        }}
        renderArrowPrev={(clickHandler, hasNext) => {
          return (
            hasNext && (
              <button
                onClick={clickHandler}
                className=" bg-white active:bg-jrl active:border-0 
                 outline-none mx-[5px] bg-opacity-40 absolute z-30 left-[0px] top-[50%] border rounded-full p-2"
              >
                <MdKeyboardDoubleArrowLeft size={30} />
              </button>
            )
          );
        }}
        renderIndicator={(clickHandler, isSelected, index) => {
          return (
            <li
              onClick={clickHandler}
              className={`ind h-2 w-2 m-2 rounded-full
                 ${isSelected ? "active bg-jrl " : " bg-slate-300"}`}
              key={index}
              role="button"
            />
          );
        }}
      >
        {children}
      </Carousel>
    </div>
  );
};

export default CustomCarousel;
