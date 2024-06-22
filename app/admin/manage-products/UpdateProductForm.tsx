"use client";
import Heading from "@/app/components/Heading";
import CategoryInput from "@/app/components/inputs/CategoryInput";
import CustomCheckBox from "@/app/components/inputs/CustomCheckBoxs";
import TextArea from "@/app/components/inputs/TextArea";
import Input from "@/app/components/inputs/Input";
import { categoryButtons } from "@/utils/categories";
import { productColors } from "@/utils/productsColors";
import {
  JSXElementConstructor,
  PromiseLikeOfReactNode,
  ReactElement,
  ReactNode,
  ReactPortal,
  useCallback,
  useEffect,
  useState,
} from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import ColorSelector from "@/app/components/inputs/ColorSelector";
import Button from "@/app/components/Button";
import toast from "react-hot-toast";

import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
  uploadBytesResumable,
} from "firebase/storage";
import FirebaseApp from "@/libs/firebase";
import axios from "axios";
import { useRouter } from "next/navigation";
import DataListInput from "@/app/components/inputs/DataListInput";
import AccordionComponent from "@/app/components/accordion/AccordionComponent";
import ImageViewer from "@/app/components/imageViewer/ImageView";
import { getUniqueString } from "@/utils/uniqueString";
import Image from "next/image";
import { MdDelete } from "react-icons/md";
import CurrentImageDelete from "./CurrentImageDelete";
import { imagesArray } from "./ManageProductsClient";
import DeleteProductExistingImages from "./DeleteProductExistingImages/DeleteProductExistingImages";

export type ImageType = {
  color: string;
  colorCode: string;
  image: File | null;
};
export type UplodedImageType = {
  color: string;
  colorCode: string;
  image: string; // string of image in db
};

interface UpdateProductFormProps {
  formValues?: any;
}

const UpdateProductForm: React.FC<UpdateProductFormProps> = ({
  formValues,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [stateImage, setStateImage] = useState();
  const [images, setImages] = useState<ImageType[] | null>(null);
  const [isProductCreated, setIsProductCreated] = useState(false);
  const [imagesUrls, setImagesUrls] = useState<any>();
  const [modifiedImagesUrls, setModifiedImagesUrls] = useState<any>();
  const [selectedImagesFromDB, setSelectedImagesFromDB] = useState([]);
  const router = useRouter();
  const {
    name: defaultName,
    description: defaultDescription,
    price: defaultPrice,
    brand: defaultBrand,
    category: defaultCategory,
    inStock: defaultInStock,
    images: defaultImages,
    sku: defaultSku,
    model: defaultModel,
  } = formValues || {};
  // console.log("defaultImages 🦗", defaultImages);
  // console.log("formValues 🦗😀🦗😀🦗😀", formValues);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      description: "",
      price: "",
      brand: "",
      category: "",
      inStock: true,
      images: [],
      sku: "",
      model: "",
      // sale: false,
    },
  });

  // useEffect(() => {
  //   console.log("stateImage 🔻", stateImage);
  // }, [stateImage]);
  useEffect(() => {
    // useForm(formValues);
    if (formValues !== undefined) {
      // console.log("Setting formvalues from uef");
      // console.log("defaultName", defaultName);
      setCustomValue("name", defaultName);
      setCustomValue("description", defaultDescription);
      setCustomValue("price", defaultPrice);
      setCustomValue("brand", defaultBrand);
      setCustomValue("category", defaultCategory);
      setCustomValue("inStock", defaultInStock);
      setCustomValue("images", defaultImages);
      setCustomValue("sku", defaultSku);
      setCustomValue("model", defaultModel);
      // console.log("defaultImages", defaultImages);
      setStateImage(defaultImages);
    }
  }, [formValues]);
  // console.log("formValues", formValues);

  const category = watch("category");
  // useEffect(() => {
  //   console.log("images 🟠", images);
  //   console.log("imagesUrls 🟡", imagesUrls);
  // }, [images, imagesUrls]);

  // useEffect(() => {
  //   setCustomValue("images", images);
  //   console.log("IMAGES", images);
  // }, [images]);

  useEffect(() => {
    if (isProductCreated) {
      reset();
      setImages(null);
      setIsProductCreated(false);
    }
  }, [isProductCreated]);

  useEffect(() => {
    console.log("modifiedImagesUrls", modifiedImagesUrls);
  }, [modifiedImagesUrls]);

  const selectForDelete = (selectedImage: any) => {
    // console.log("log from updateProductForm", image);
    let pendingForDeletion: any[] = [];
    console.log("image from selectForDelete 🧡", selectedImage);
    // setModifiedImagesUrls((element: any) =>
    //   element?.includes(image)
    //     ? element.filter((n: imagesArray) => n !== image)
    //     : [image, ...element]
    // );

    if (
      modifiedImagesUrls.some(
        (e: { image: any }) => e.image === selectedImage.image
      )
    ) {
      console.log("there is no in state");
      // pendingForDeletion.filter((n: imagesArray) => n !== selectedImage);
    } else {
      console.log("there is item in state");
      // pendingForDeletion.push(selectedImage);
    }

    // pendingForDeletion.includes(selectedImage)
    //   ? pendingForDeletion.filter((n: imagesArray) => n !== selectedImage)
    //   : // : [selectedImage, ...pendingForDeletion];
    //     pendingForDeletion.push(selectedImage);
    // // console.log("we are");

    console.log("pendingForDeletion 🔻 ", pendingForDeletion);
  };

  const onChangeCategory = (event: any) => {
    // console.log("🟡", event.target.value);
    setCustomValue("category", event.target.value);
  };

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  const addImageToState = useCallback((value: ImageType) => {
    setImages((prev) => {
      if (!prev) {
        return [value];
      }
      return [...prev, value];
    });
  }, []);
  const removeImageFromState = useCallback((value: ImageType) => {
    setImages((prev) => {
      if (prev) {
        const filteredImages = prev.filter(
          (item) => item.color !== value.color
        );
        return filteredImages;
      }
      return prev;
    });
  }, []);
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log("Product data ", data);
    const {
      name,
      description,
      price,
      brand,
      category,
      inStock,
      images,
      sku,
      model,
    } = data;

    if (images === undefined || images === null) {
      // images where not modified
    } else {
      //saber si se agarró una imagen de la lista o se subió una nueva
    }

    // setIsLoading(true);
    // let updloadedImages: UplodedImageType[] = [];

    // if (!data.category) {
    //   setIsLoading(false);
    //   return toast.error("Category is not selected");
    // }
    // // if (!data.price) {
    // //   setIsLoading(false);
    // //   return toast.error("Price is not selected");
    // // }

    // if (!data.images || data.images.length === 0) {
    //   setIsLoading(false);
    //   return toast.error("Images are not selected");
    // }

    // const handleImageUploads = async () => {
    //   toast("Creating product...");

    //   try {
    //     for (const item of data.images) {
    //       if (item.image) {
    //         // console.log("item.image: 💀💀💀💀" + item);
    //         console.log(`${item.image.name}   ---💀💀💀💀`);
    //         const fileName = new Date().getTime() + "-" + item.image.name;
    //         const storage = getStorage(FirebaseApp);
    //         const storageRef = ref(storage, `prodcuts/${fileName}`);
    //         const uploadTask = uploadBytesResumable(storageRef, item.image);

    //         await new Promise<void>((resolve, reject) => {
    //           uploadTask.on(
    //             "state_changed",
    //             (snapshot) => {
    //               // Observe state change events such as progress, pause, and resume
    //               // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
    //               const progress =
    //                 (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    //               console.log("Upload is " + progress + "% done");
    //               switch (snapshot.state) {
    //                 case "paused":
    //                   console.log("Upload is paused");
    //                   break;
    //                 case "running":
    //                   console.log("Upload is running");
    //                   break;
    //               }
    //             },
    //             (error) => {
    //               // Handle unsuccessful uploads
    //               toast.error(
    //                 "Error uploading image, please try again: " + error
    //               );
    //             },
    //             () => {
    //               getDownloadURL(uploadTask.snapshot.ref)
    //                 .then((downloadURL: string) => {
    //                   updloadedImages.push({
    //                     ...item,
    //                     image: downloadURL,
    //                   });
    //                   console.log("File available at", downloadURL);
    //                   resolve();
    //                 })
    //                 .catch((error: any) => {
    //                   toast.error(
    //                     "Error uploading image, please try again: " + error
    //                   );
    //                   console.log("Error getting the download URL", error);
    //                   reject(error);
    //                 });
    //             }
    //           );
    //         });
    //         //end of promise
    //       } //end of if item.image
    //     } //end of for const in item
    //   } catch (error) {
    //     setIsLoading(false);
    //     console.log("Error handling image uploads", error);
    //     toast.error("Error handling image uploads");
    //   }
    // };
    // //TODO save product to mongo

    // await handleImageUploads();
    // const productData = { ...data, images: updloadedImages };
    // setImagesUrls(updloadedImages);
    // console.log("PRoduct data: " + productData);

    // axios
    //   .post("/api/product", productData)
    //   .then(() => {
    //     toast.success("Product created successfully");
    //     setIsProductCreated(true);
    //     router.refresh();
    //   })
    //   .catch((error: any) => {
    //     toast.error("Something went wrong please try again", error);
    //   })
    //   .finally(() => {
    //     setIsLoading(false);
    //   });
  };
  return (
    <>
      <Heading title="Update a product" center />
      <div className="m-auto flex p-3 gap-3">
        <div className="w-1/3">
          <Input
            id="name"
            label="Name"
            disabled={isLoading}
            register={register}
            errors={errors}
          />
          <TextArea
            id="description"
            label="description"
            disabled={isLoading}
            register={register}
            errors={errors}
          />
          <Input
            id="price"
            label="price"
            disabled={isLoading}
            register={register}
            errors={errors}
            type="number"
          />
          <Input
            id="brand"
            label="brand"
            disabled={isLoading}
            register={register}
            errors={errors}
          />

          <Input
            id="sku"
            label="sku"
            disabled={isLoading}
            register={register}
            errors={errors}
          />

          <CustomCheckBox
            id="inStock"
            label="This product is in stock"
            disabled={isLoading}
            register={register}
          />
        </div>
        <div className="w-1/3 font-medium ">
          <div className="mb-2 font-semibold ">Select a Category</div>
          <DataListInput
            data={categoryButtons}
            register={register}
            id="Category"
            errors={errors}
            label={formValues.category}
            onClick={(category: any) => setCustomValue("category", category)}
            onChange={onChangeCategory}
          />

          <ImageViewer />
        </div>

        <div className="w-1/3 flex flex-col flex-wrap gap-4">
          {/* <div>
            <DeleteProductExistingImages
              images={images}
              formValues={formValues}
              selectForDelete={selectForDelete}
            />
          </div> */}

          <div className="">
            <AccordionComponent title={"Add new images"}>
              <div className=" grid grid-cols-2 gap-2">
                {productColors.map((item, index) => {
                  return (
                    <ColorSelector
                      key={index + getUniqueString(2)}
                      item={item}
                      addImageToState={addImageToState}
                      removeImageFromState={removeImageFromState}
                      isProductCreated={isProductCreated}
                    />
                  );
                })}
              </div>
            </AccordionComponent>
          </div>
        </div>
      </div>
      <Button
        label={isLoading ? "Loading" : "Update Product"}
        onClick={handleSubmit(onSubmit)}
      />
    </>
  );
};

export default UpdateProductForm;
