import { getUniqueString } from "@/utils/uniqueString";
import { ImageList, ImageListItem, ImageListItemBar } from "@mui/material";
import React from "react";
interface CustomImageListProps {
  itemData?: any;
}
const CustomImageList: React.FC<CustomImageListProps> = ({ itemData }) => {
  //   console.log("itemData", itemData);

  const handleImageClick = (item: any) => {
    console.log("item ", item);
  };

  return (
    <>
      {/* <ImageList sx={{ width: 500, height: 450 }} cols={4} rowHeight={164}> */}
      <ImageList
        sx={{ width: 350, height: 350 }}
        cols={4}
        rowHeight={164}
        gap={3}
      >
        {itemData.map((item: any) => (
          // console.log("item", item),
          <div
            onClick={() => handleImageClick(item)}
            key={item.colorCode + getUniqueString(4)}
            className="hover:cursor-pointer"
          >
            {/* <ImageListItem key={item.colorCode + getUniqueString(4)} > */}
            <ImageListItem>
              <img
                srcSet={`${item.image}`}
                src={`${item.image}`}
                //   srcSet={`${item.image}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                //   src={`${item.image}?w=164&h=164&fit=crop&auto=format`}
                alt={item.colorCode}
                loading="lazy"
              />
              <ImageListItemBar
                title={item.color}
                subtitle={item.author}
                //   actionIcon={
                //     <IconButton
                //       sx={{ color: "rgba(255, 255, 255, 0.54)" }}
                //       aria-label={`info about ${item.title}`}
                //     >
                //       <InfoIcon />
                //     </IconButton>
                //   }
              />
            </ImageListItem>
          </div>
        ))}
      </ImageList>
    </>
  );
};

export default CustomImageList;
