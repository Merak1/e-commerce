"use client";
import axios from "axios";
import toast from "react-hot-toast";

const Test = () => {
  const ProductId = "66985eca3f6ac97dc9967d2a";

  const createTestProduct = () => {
    toast("benis");
    // const onlyId = ["66a1b43ba2b10451875ffd62", "66a2a96900252c70d0d4e3ef"];
    // const onlyId = ["66a1ac43a2b10451875ffd60"];
    // const onlyId = "66a1ac43a2b10451875ffd60";
    const onlyId = "66a18add764ecef16cfbecc0"; //this is black
    const image1 = {
      id: "66a1b43ba2b10451875ffd62",
      color: "menta",
      colorCode: "#75f4ac",
      image:
        "https://firebasestorage.googleapis.com/v0/b/jrl-shop.appspot.com/o/prodcuts%2Fcompendio-carcasas-con-orilla-de-color011.png?alt=media&token=3eb73f37-c76c-4338-97db-75b4d7fca4ac",
      name: "compendio-carcasas-con-orilla-de-color011.png",
      productIDs: [],
    };
    let images: any = [image1];
    axios
      .post("/api/test", { onlyId, ProductId })
      //   .post("/api/test", image1)
      .then((res) => {
        console.log("res", res.data);
        toast.success("Image uploaded successfully");
        // setIsProductCreated(true);
        // setIsImageCreated(true);
        // router.refresh();
      })
      .catch((error: any) => {
        toast.error("Something went wrong please try again", error);
      });
  };
  return (
    <div>
      <button onClick={() => createTestProduct()}>Create client</button>
    </div>
  );
};

export default Test;
