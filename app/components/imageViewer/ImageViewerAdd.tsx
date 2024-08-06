import React, { useContext, useEffect, useState } from "react";
import {
  Controller,
  FieldValues,
  SubmitHandler,
  useForm,
} from "react-hook-form";

import CustomImageList from "../imageList/CustomImageList";
import AccordionComponent from "../accordion/AccordionComponent";
import {
  allDbImagesContextAdd,
  ImageType,
} from "@/app/admin/add-products/AddProductForm";
interface ImageViewerAddProps {
  addImageToState: any;
  removeImageFromState: any;
}
const ImageViewerAdd: React.FC<ImageViewerAddProps> = ({
  removeImageFromState,
  addImageToState,
}) => {
  const allDbImages = useContext(allDbImagesContextAdd);

  const [isLoading, setIsLoading] = useState(false);
  const { handleSubmit, control } = useForm<FormValues>();
  const [inputValue, setInputValue] = useState("");
  // const [images, setImages] = useState<ImageType[] | null>(null);

  const [debouncedInputValue, setDebouncedInputValue] = useState("");
  type FormValues = {
    inputSearch: string;
  };

  // useEffect(() => {
  //   console.log("images from state", images);
  // }, [images]);
  // console.log("allDbImages 🎪", allDbImages);

  useEffect(() => {
    console.log(" --------🈁 allDbImages 🈁------");
    console.log(allDbImages);
  }, [allDbImages]);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log("Product data from image view", data);
  };

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
    <div className="mt-5">
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

          {allDbImages?.length === 0 ? (
            <div className="">there are no images</div>
          ) : (
            <CustomImageList
              itemData={allDbImages}
              addImageToState={addImageToState}
              removeImageFromState={removeImageFromState}
            />
          )}
        </form>
      </AccordionComponent>
    </div>
  );
};

export default ImageViewerAdd;
