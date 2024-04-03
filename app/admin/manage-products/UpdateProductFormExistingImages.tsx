import { getUniqueString } from "@/utils/uniqueString";
import Image from "next/image";
import CurrentImageDelete from "./CurrentImageDelete";
import { useEffect, useState } from "react";

interface UpdateProductFormExistingImagesProps {
  imagesLength: number;
  image: any;
}

const UpdateProductFormExistingImages: React.FC<
  UpdateProductFormExistingImagesProps
> = ({ imagesLength, image }) => {
  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    console.log("  toggle from outside", toggle);
  }, [toggle]);
  return (
    <div
      className={`
      ${toggle ? "opacity-40" : ""}
    relative
    `}
    >
      <div
        className={`relative w-[70px] aspect-square
        `}
        key={image.color + getUniqueString(4)}
      >
        {image.color}
        <Image
          src={image.image}
          alt={image.color}
          fill
          className="object-contain"
        />

        {imagesLength > 1 && (
          <CurrentImageDelete setToggle={setToggle} toggle={toggle} />
        )}
      </div>
      <div>{image.color}</div>
    </div>
  );
};

export default UpdateProductFormExistingImages;
