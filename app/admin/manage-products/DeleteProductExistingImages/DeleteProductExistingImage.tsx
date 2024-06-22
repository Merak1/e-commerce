import { getUniqueString } from "@/utils/uniqueString";
import Image from "next/image";
import CurrentImageDelete from "../CurrentImageDelete";
import { useEffect, useState } from "react";
import { imagesArray } from "../ManageProductsClient";

interface DeleteProductExistingImageProps {
  imagesLength: number;
  image: any;
  selectForDelete: (image: imagesArray) => void;
}

const DeleteProductExistingImage: React.FC<DeleteProductExistingImageProps> = ({
  imagesLength,
  image,
  selectForDelete,
}) => {
  const [toggle, setToggle] = useState(false);

  // useEffect(() => {
  //   console.log("  toggle from outside", toggle);
  // }, [toggle]);
  // const selectForDelete =(image: imagesArray) => {

  // }
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
        title={image.color}
        onClick={() => selectForDelete(image)}
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

export default DeleteProductExistingImage;
