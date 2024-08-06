import Container from "@/app/components/Container";
import AddProductForm from "./AddProductForm";
import getImages from "@/actions/getImages";
import getAllImages from "@/actions/getAllImages";

const AddProducts = async () => {
  // const images = await getImages({ category: null });
  const allImages = await getAllImages();
  // console.log("⚫⚪images ⚫⚪", images);
  // console.log("⚫⚪ allImages ⚫⚪", allImages);
  return (
    <div className="p-8">
      <Container>
        <AddProductForm allImages={allImages} />
        {/* <AddProductForm /> */}
      </Container>
    </div>
  );
};

export default AddProducts;
