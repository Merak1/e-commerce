import DeleteProductExistingImage from "./DeleteProductExistingImage";

const DeleteProductExistingImages = ({
  images,
  formValues,
  selectForDelete,
}) => {
  //   return <div>This is DeleteProductExistingImages</div>;
  //   const existingImages = formValues.images;

  //   console.log("existingImages: " + existingImages);

  return (
    images !== undefined && (
      <>
        <p className="font-bold">Imágenes actuales del producto:</p>
        <div className="flex gap-4 ">
          {formValues.images.map(
            (image: any) => (
              //   console.log("Image" + image),
              console.log(image),
              (
                <DeleteProductExistingImage
                  selectForDelete={selectForDelete}
                  imagesLength={formValues.images.length}
                  image={image}
                />
              )
            )
          )}
        </div>
      </>
    )
  );
};

export default DeleteProductExistingImages;
