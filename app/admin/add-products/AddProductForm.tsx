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
import DataListInput from "@/app/components/inputs/DataListInput";
import { getUniqueString } from "@/utils/uniqueString";
import ImageViewer from "@/app/components/imageViewer/ImageViewerUpdate";
import AccordionComponent from "@/app/components/accordion/AccordionComponent";
import { imagesArray } from "../manage-products/ManageProductsClient";
import { createContext } from "react";
import ImageViewerAdd from "@/app/components/imageViewer/ImageViewerAdd";

export type ImageType = {
  color: string;
  colorCode: string;
  image: File | null;
  name?: string;
};
export type UplodedImageType = {
  color: string;
  colorCode: string;
  image: string; // string of image in db
};

interface AddProductFormProps {
  formValues?: any;
  allImages?: imagesArray | any;
}
export const allDbImagesContextAdd = createContext<any>(undefined);

const AddProductForm: React.FC<AddProductFormProps> = ({
  formValues,
  allImages,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [images, setImages] = useState<ImageType[] | any>(null);
  const [selectedImages, setSelectedImages] = useState<any>();
  const [isProductCreated, setIsProductCreated] = useState(false);
  const [isImageCreated, setIsImageCreated] = useState(false);
  const [imagesUrls, setImagesUrls] = useState<any>();
  const router = useRouter();
  let updloadedImages: UplodedImageType[] = [];

  useEffect(() => {
    console.log(" IMAGES seleccionadas de las existentes  🐟", images);
  }, [images]);
  useEffect(() => {
    console.log(" IMAGES seleccionadas nuevas de upload 🦈", selectedImages);
  }, [selectedImages]);

  useEffect(() => {
    console.log("⚫⚪ allImages ⚫⚪", allImages);
  }, [allImages]);

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
    packageInfo: defaultPackageInfo,
    productType: defaultProductType,
  } = formValues || {};
  // console.log("formValues 🦗", formValues);
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
      productType: "",
      packageInfo: {
        h: 0,
        // w: 0,
        hh: 0,
        weight: 0,
        declaredValue: 0,
      },
      // sale: false,
    },
  });

  const productTypes = ["THERMOS", "CASE"];

  useEffect(() => {
    // useForm(formValues);
    if (formValues !== undefined) {
      console.log("Setting formvalues from uef");
      console.log("defaultName", defaultName);
      setCustomValue("name", defaultName);
      setCustomValue("description", defaultDescription);
      setCustomValue("price", defaultPrice);
      setCustomValue("brand", defaultBrand);
      setCustomValue("category", defaultCategory);
      setCustomValue("inStock", defaultInStock);
      setCustomValue("images", defaultImages);
      setCustomValue("sku", defaultSku);
      setCustomValue("model", defaultModel);
      setCustomValue("packageInfo", defaultPackageInfo);

      setImages(images);
    }
  }, [formValues]);

  useEffect(() => {
    console.log("packageInfo", defaultPackageInfo);
  }, [formValues]);

  // console.log("formValues", formValues);

  const category = watch("category");
  useEffect(() => {
    console.log("images 🟠", images);
    console.log("imagesUrls 🟡", imagesUrls);
  }, [images, imagesUrls]);
  useEffect(() => {
    setCustomValue("images", images);
    console.log("IMAGES", images);
  }, [images]);

  useEffect(() => {
    if (isProductCreated) {
      reset();
      setImages(null);
      setIsProductCreated(false);
      setIsImageCreated(false);
    }
  }, [isProductCreated]);

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

  const addImageToDB = useCallback((images: ImageType[]) => {}, []);

  const addImageToStateNewImage = useCallback((value: ImageType) => {
    setSelectedImages((prev: any) => {
      if (!prev) {
        return [value];
      }
      return [...prev, value];
    });
  }, []);
  const removeImageFromStateNewImage = useCallback((value: ImageType) => {
    setSelectedImages((prev: any) => {
      if (prev) {
        const filteredImages = prev.filter(
          (item: any) => item.color !== value.color
        );
        return filteredImages;
      }
      return prev;
    });
  }, []);
  const addImageToState = useCallback((value: ImageType) => {
    setImages((prev: any) => {
      if (!prev) {
        return [value];
      }
      return [...prev, value];
    });
  }, []);
  const removeImageFromState = useCallback((value: ImageType) => {
    setImages((prev: any) => {
      if (prev) {
        const filteredImages = prev.filter(
          (item: any) => item.color !== value.color
        );
        return filteredImages;
      }
      return prev;
    });
  }, []);

  const handleImageUpload = async (data: any) => {
    const handleImageUploads = async () => {
      toast("Creating product...");

      try {
        for (const item of images) {
          if (item.image) {
            // console.log("item.image: 💀💀💀💀" + item);
            console.log(`${item.image.name}   ---💀💀💀💀`);
            // const fileName = new Date().getTime() + "-" + item.image.name;
            const fileName = item.image.name;
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
                        name: fileName,
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
    console.log("data", data);
    const productData = { ...data, images: updloadedImages };
    // const productData = { ...data, images: updloadedImages };
    setImagesUrls(updloadedImages);
    // console.log("PRoduct data: " + productData);
    console.log("🟠🟠 updloadedImages 🟠🟠 " + updloadedImages);
    console.log(updloadedImages);

    //iterate through the updloaded images and for each one
    // we add it to the image db
    updloadedImages.forEach((updloadedImage: any) => {
      axios
        .post("/api/create-image", updloadedImage)
        .then(() => {
          toast.success("Image uploaded successfully");
          // setIsProductCreated(true);
          // setIsImageCreated(true);
          router.refresh();
        })
        .catch((error: any) => {
          toast.error("Something went wrong please try again", error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    });
  };

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log("Product data ", data);
    //TODO upload image to firebase

    setIsLoading(true);
    // let updloadedImages: UplodedImageType[] = [];

    // if (!data.price) {
    //   setIsLoading(false);
    //   return toast.error("Price is not selected");
    // }
    // if (!data.name) {
    //   setIsLoading(false);
    //   return toast.error("Name is not selected");
    // }
    // if (!data.description) {
    //   setIsLoading(false);
    //   return toast.error("Description is not selected");
    // }
    // if (!data.brand) {
    //   setIsLoading(false);
    //   return toast.error("Brand is not selected");
    // }
    // if (!data.category) {
    //   setIsLoading(false);
    //   return toast.error("Category is not selected");
    // }
    // if (!data.inStock) {
    //   setIsLoading(false);
    //   return toast.error("Instock is not selected");
    // }
    // if (!data.sku) {
    //   setIsLoading(false);
    //   return toast.error("Sku is not selected");
    // }
    // // if (!data.model) {
    // //   setIsLoading(false);
    // //   return toast.error("Model is not selected");
    // // }
    // if (!data.packageInfo) {
    //   setIsLoading(false);
    //   return toast.error("Packageinfo is not selected");
    // }
    // if (!data.productType) {
    //   setIsLoading(false);
    //   return toast.error("Producttype is not selected");
    // }

    if (!data.images || data.images.length === 0) {
      setIsLoading(false);
      return toast.error("Images are not selected");
    }
    // toast.success(`${images}`);
    // axios
    //   .post("/api/add-image-to-product", images)
    //   .then(() => {
    //     toast.success("Image added to product successfully");
    //     // setIsProductCreated(true);
    //     // setIsImageCreated(true);
    //     router.refresh();
    //   })
    //   .catch((error: any) => {
    //     toast.error("Something went wrong please try again", error);
    //   })
    //   .finally(() => {
    //     setIsLoading(false);
    //   });
    // axios
    //   .post("/api/image", updloadedImages)
    //   .then(() => {
    //     toast.success("Image uploaded successfully");
    //     // setIsProductCreated(true);
    //     // setIsImageCreated(true);
    //     router.refresh();
    //   })
    //   .catch((error: any) => {
    //     toast.error("Something went wrong please try again", error);
    //   })
    //   .finally(() => {
    //     setIsLoading(false);
    //   });

    const productData = { ...data, images };

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
      <allDbImagesContextAdd.Provider value={allImages}>
        <Heading title="Add a product" center />
        {/* <div className=" max-w-3xl m-auto flex"> */}
        <div className=" m-auto justify-between flex  p-1 gap-3">
          <div className="w-[25%]">
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
          <div className="w-[25%] font-medium ">
            <div className="mb-2 font-semibold ">Select a Category</div>
            {/* <div className="grid grid-cols-2 md:grid-cols-5 gap-1  overflow-auto">
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
          </div> */}

            <DataListInput
              data={categoryButtons}
              register={register}
              id="Category"
              errors={errors}
              onClick={(category: any) => setCustomValue("category", category)}
              onChange={onChangeCategory}
            />

            <div className=" m-auto">
              <Input
                id="packageInfo.h"
                label="height h (alto cm)"
                disabled={isLoading}
                register={register}
                type="number"
                errors={errors}
                valueAsNumber={true}
              />
              <Input
                id="packageInfo.w"
                label="width w (ancho cm)"
                disabled={isLoading}
                register={register}
                type="number"
                errors={errors}
                valueAsNumber={true}
              />
              <Input
                id="packageInfo.hh"
                label="depth hh (profundidad cm)"
                disabled={isLoading}
                register={register}
                type="number"
                errors={errors}
                valueAsNumber={true}
              />
              <Input
                id="packageInfo.declaredValue"
                label="valor declarado"
                disabled={isLoading}
                register={register}
                type="number"
                errors={errors}
                valueAsNumber={true}
              />
            </div>
            <div className="m-auto ">
              <p>Select product type</p>

              <div className="flex justify-center">
                {productTypes &&
                  productTypes.map((productType) => {
                    return (
                      <div key={productType} className="flex flex-col m-2 ">
                        <h1>{productType} </h1>
                        <input
                          className="cursor-pointer"
                          type="radio"
                          value={productType}
                          {...register("productType")}
                        />
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>

          <div className="w-[50%] flex flex-col flex-wrap gap-2">
            {/* <div>
            <div className="font-bold">Select available colors</div>
            <div className="text-sm">Please select all available colors</div>
          </div>
          <div className="grid grid-cols-2 gap-2">
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
          </div> */}

            <ImageViewerAdd
              // existingImage={existingImage}
              addImageToState={addImageToState}
              removeImageFromState={removeImageFromState}
            />

            <div className="">
              <AccordionComponent title={"Add new images"}>
                <div className=" grid grid-cols-2 gap-2">
                  {productColors.map((item, index) => {
                    return (
                      <ColorSelector
                        key={index + getUniqueString(2)}
                        item={item}
                        addImageToState={addImageToStateNewImage}
                        removeImageFromState={removeImageFromStateNewImage}
                        isProductCreated={isProductCreated}
                      />
                    );
                  })}
                </div>
                <Button label="upload new image" onClick={handleImageUpload} />
              </AccordionComponent>
            </div>
          </div>
        </div>
        <Button
          label={isLoading ? "Loading" : "Add Product"}
          onClick={handleSubmit(onSubmit)}
        />
      </allDbImagesContextAdd.Provider>
    </>
  );
};

export default AddProductForm;
