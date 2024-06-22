import { SetStateAction, useContext, useEffect, useState } from "react";
import { allDbImagesContext } from "../../admin/manage-products/ManageProductsClient";
import {
  Controller,
  FieldValues,
  SubmitHandler,
  useForm,
} from "react-hook-form";

import ImagePreview from "./ImagePreview";
import Input from "../inputs/Input";
import Button from "../Button";
import CustomImageList from "../imageList/ImageList";
import AccordionComponent from "../accordion/AccordionComponent";

const ImageViewer = () => {
  const allDbImages = useContext(allDbImagesContext);
  const [isLoading, setIsLoading] = useState(false);
  const { handleSubmit, control } = useForm<FormValues>();
  const [inputValue, setInputValue] = useState("");
  const [debouncedInputValue, setDebouncedInputValue] = useState("");
  type FormValues = {
    inputSearch: string;
  };

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log("Product data from image view", data);
  };

  const testShowMultipleImages = [
    //delete me
    ...allDbImages,
    ...allDbImages,
    ...allDbImages,
    ...allDbImages,
    // ...allDbImages,
    // ...allDbImages,
  ];

  useEffect(() => {
    const delayInputTimeoutId = setTimeout(() => {
      // console.log("inputvalue ", inputValue);
      setDebouncedInputValue(inputValue);
    }, 500);
    return () => clearTimeout(delayInputTimeoutId);
    // }, [inputValue, 500]);
  }, [inputValue]);

  useEffect(() => {
    // console.log("aqui hacemos el filtrado ", debouncedInputValue);
  }, [debouncedInputValue]);

  const onChangeFirst = (search: any) => {
    // console.log("search", search);
    setInputValue(search);
  };

  return (
    <div className="bg-slate-300 p-4 m-2">
      {/* <p>Search existing images</p> */}
      <AccordionComponent title={"Search for existing images"}>
        <form onSubmit={handleSubmit((data) => console.log(data))}>
          <Controller
            control={control}
            name="inputSearch"
            render={({ field: { onChange, onBlur, value, ref } }) => (
              <>
                <div className="w-full relative mt-3">
                  <input
                    id="search-image"
                    type="text"
                    className={`peer w-full 
                outline-none bg-white p-3 pt-6
                font-light border-2 rounded-md transition disabled:opacity-70 
                disabled:cursor-not-allowed border-slate-300
                `}
                    onChange={(e) => {
                      onChangeFirst(value);
                      onChange(e);
                    }}
                  />
                  <label
                    className={`absolute cursor-text text-md
                duration-150 transform 
                -translate-y-3 top-5 z-5 
                origin-[0]  text-slate-400
                left-4 peer-placeholder-shown:scale-100
                peer-placeholder-shown:translate-y-0 
                peer-focus:scale-75 peer-focus:-translate-y-5
                capitalize`}
                    htmlFor={"search-image"}
                  >
                    search
                  </label>
                </div>
              </>
            )}
          />

          {allDbImages.length === 0 ? (
            <div className="">there are no images</div>
          ) : (
            <CustomImageList itemData={testShowMultipleImages} />

            // allDbImages?.map(
            //   (dbImage: { color: string; colorCode: string; image: string }) => {
            //     const { color, colorCode, image } = dbImage;
            //     // console.log("image: " + image);
            //     // console.log(color);
            //     // console.log(colorCode);
            //     // console.log(image);
            //     return (
            //       <div>
            //         <ImagePreview
            //           color={color}
            //           colorCode={colorCode}
            //           image={image}
            //         />
            //       </div>
            //     );
            //   }
            // )
          )}
        </form>
      </AccordionComponent>
    </div>
  );
};

export default ImageViewer;
