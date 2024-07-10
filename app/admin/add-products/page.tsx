import Container from "@/app/components/Container";
import AddProductForm from "./AddProductForm";
import getImages from "@/actions/getImages";

const AddProducts = async () => {
  const images = await getImages({ category: null });
  console.log("⚫⚪images ⚫⚪", images);
  return (
    <div className="p-8">
      <Container>
        <AddProductForm allDbImages={images} />
      </Container>
    </div>
  );
};

export default AddProducts;
