import { getUniqueString } from "@/utils/uniqueString";
import { ImageList, ImageListItem, ImageListItemBar } from "@mui/material";
import React, { useEffect, useState } from "react";
import ImageElement from "./ImageElement";
interface CustomImageListProps {
  itemData?: any;
  removeImageFromState: any;
  addImageToState: any;
  existingImage?: any;
}
const CustomImageList: React.FC<CustomImageListProps> = ({
  itemData,
  addImageToState,
  removeImageFromState,
  existingImage,
}) => {
  return (
    <>
      {/* <ImageList sx={{ width: 500, height: 450 }} cols={4} rowHeight={164}> */}
      <ImageList
        sx={{ width: 350, height: 350 }}
        cols={4}
        rowHeight={164}
        gap={3}
      >
        {itemData &&
          itemData.map((item: any) => (
            <ImageElement
              existingImage={existingImage}
              item={item}
              addImageToState={addImageToState}
              removeImageFromState={removeImageFromState}
            />
          ))}
      </ImageList>
    </>
  );
};

export default CustomImageList;
