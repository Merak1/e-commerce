import { ImageType } from "@/app/admin/add-products/AddProductForm";
import { getUniqueString } from "@/utils/uniqueString";
import { ImageListItem, ImageListItemBar } from "@mui/material";
import React, { useEffect, useState } from "react";
interface ImageElementProps {
  item: any;
  addImageToState: any;
  removeImageFromState: any;
  existingImage: any;
}
const ImageElement: React.FC<ImageElementProps> = ({
  item,
  addImageToState,
  removeImageFromState,
  existingImage,
}) => {
  const [isSelected, setIsSelected] = useState<boolean>(false);

  useEffect(() => {
    if (existingImage) {
      existingImage.forEach((element: ImageType) => {
        if (element.image === item.image) {
          //"una imagen de el productio solucionado está seleccioada"
          setIsSelected(true);
        }
      });
    }
  }, [existingImage]);

  useEffect(() => {
    if (isSelected === true) {
      addImageToState(item);
    } else {
      removeImageFromState(item);
    }
  }, [isSelected]);

  const handleImageClick = (item: any) => {
    // console.log("item ", item);
    setIsSelected((prev) => !prev);
  };

  return (
    <div
      onClick={() => handleImageClick(item)}
      key={item.colorCode + getUniqueString(4)}
      className="hover:cursor-pointer"
    >
      <ImageListItem
        // sx={{ whiteSpace: "break-spaces" }}
        className={`
            p-2 
           ${isSelected ? "border-jrl border-[3px]" : ""} `}
      >
        <img
          srcSet={`${item.image}`}
          src={`${item.image}`}
          //   srcSet={`${item.image}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
          //   src={`${item.image}?w=164&h=164&fit=crop&auto=format`}
          alt={item.colorCode}
          loading="lazy"
        />
        <ImageListItemBar
          // className="h-[80px] whitespace-nowrap wrap text-sm px-2 "
          title={item.color}
          subtitle={item.name}
          sx={{
            minHeight: 80,
            // backgroundColor: "red",
            // whiteSpace: "break-spaces",
            // textWrap: "wrap",
            // display: "inline-block",
          }}
          // position="below"
        />
        {/* <div>{item.name}</div> */}
      </ImageListItem>
    </div>
  );
};

export default ImageElement;
