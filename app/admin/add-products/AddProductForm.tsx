"use client";
import Heading from "@/app/components/Heading";
import CategoryInput from "@/app/components/inputs/CategoryInput";
import CustomCheckBox from "@/app/components/inputs/CustomCheckBoxs";
import TextArea from "@/app/components/inputs/TextArea";
import Input from "@/app/components/inputs/Input";
import { categoryButtons } from "@/utils/categories";
import { productColors } from "@/utils/productsColors";
import { useCallback, useEffect, useState } from "react";
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

const AddProductForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [images, setImages] = useState<ImageType[] | null>(null);
  const [isProductCreated, setIsProductCreated] = useState(false);
  const [imagesUrls, setImagesUrls] = useState<any>();
  const router = useRouter();
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
  const category = watch("category");

  useEffect(() => {
    setCustomValue("images", images);
    // console.log("IMAGES", images);
  }, [images]);

  useEffect(() => {
    if (isProductCreated) {
      reset();
      setImages(null);
      setIsProductCreated(false);
    }
  }, [isProductCreated]);

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
    //TODO upload image to firebase

    setIsLoading(true);
    let updloadedImages: UplodedImageType[] = [];

    if (!data.category) {
      setIsLoading(false);
      return toast.error("Category is not selected");
    }
    // if (!data.price) {
    //   setIsLoading(false);
    //   return toast.error("Price is not selected");
    // }

    if (!data.images || data.images.length === 0) {
      setIsLoading(false);
      return toast.error("Images are not selected");
    }

    const handleImageUploads = async () => {
      toast("Creating product...");

      try {
        for (const item of data.images) {
          if (item.image) {
            // console.log("item.image: 💀💀💀💀" + item);
            console.log(`${item.image.name}   ---💀💀💀💀`);
            const fileName = new Date().getTime() + "-" + item.image.name;
            const storage = getStorage(FirebaseApp);
            const storageRef = ref(storage, `prodcuts/${fileName}`);
            const uploadTask = uploadBytesResumable(storageRef, item.image);

            await new Promise<void>((resolve, reject) => {
              uploadTask.on(
                "state_changed",
                (snapshot) => {
                  // Observe state change events such as progress, pause, and resume
                  // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                  const progress =
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                  console.log("Upload is " + progress + "% done");
                  switch (snapshot.state) {
                    case "paused":
                      console.log("Upload is paused");
                      break;
                    case "running":
                      console.log("Upload is running");
                      break;
                  }
                },
                (error) => {
                  // Handle unsuccessful uploads
                  toast.error(
                    "Error uploading image, please try again: " + error
                  );
                },
                () => {
                  getDownloadURL(uploadTask.snapshot.ref)
                    .then((downloadURL: string) => {
                      updloadedImages.push({
                        ...item,
                        image: downloadURL,
                      });
                      console.log("File available at", downloadURL);
                      resolve();
                    })
                    .catch((error: any) => {
                      toast.error(
                        "Error uploading image, please try again: " + error
                      );
                      console.log("Error getting the download URL", error);
                      reject(error);
                    });
                }
              );
            });
            //end of promise
          } //end of if item.image
        } //end of for const in item
      } catch (error) {
        setIsLoading(false);
        console.log("Error handling image uploads", error);
        toast.error("Error handling image uploads");
      }
    };
    //TODO save product to mongo

    await handleImageUploads();
    const productData = { ...data, images: updloadedImages };
    setImagesUrls(updloadedImages);
    console.log("PRoduct data: " + productData);

    axios
      .post("/api/product", productData)
      .then(() => {
        toast.success("Product created successfully");
        setIsProductCreated(true);
        router.refresh();
      })
      .catch((error: any) => {
        toast.error("Something went wrong please try again", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  return (
    <>
      <Heading title="Add a product" center />
      <div className=" max-w-3xl m-auto">
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
        <div className="w-full font-medium ">
          <div className="mb-2 font-semibold ">Select a Category</div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 max-h[50vh] overflow-auto">
            {categoryButtons.map((item) => {
              return (
                <div key={item.label} className="col-span">
                  <CategoryInput
                    customClass={"text-sm"}
                    onClick={(category) => setCustomValue("category", category)}
                    selected={category === item.label}
                    label={item.label}
                    icon={item.icon}
                  />
                </div>
              );
            })}
          </div>
        </div>

        <div className="w-full flex flex-col flex-wrap gap-4">
          <div>
            <div className="font-bold">Select available colors</div>
            <div className="text-sm">Please select all available colors</div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {productColors.map((item, index) => {
              return (
                <ColorSelector
                  key={index}
                  item={item}
                  addImageToState={addImageToState}
                  removeImageFromState={removeImageFromState}
                  isProductCreated={isProductCreated}
                />
              );
            })}
          </div>
        </div>
      </div>
      <Button
        label={isLoading ? "Loading" : "Add Product"}
        onClick={handleSubmit(onSubmit)}
      />
    </>
  );
};

export default AddProductForm;
