import Image from "next/image";

interface MainCarouselItemProps {
  image: any;
  height: number;
}

const MainCarouselItem: React.FC<MainCarouselItemProps> = ({
  image,
  height,
}) => {
  return (
    <div className={`h-[${height}px]  `} key={image.name}>
      <Image
        src={image.src}
        alt={image.name}
        fill
        style={{ height: "100%", width: "100%" }}
      />
    </div>
  );
};

export default MainCarouselItem;
