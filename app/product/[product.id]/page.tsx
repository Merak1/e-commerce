import Container from "@/app/components/Container";
import { product } from "@/utils/product";
import ProductDetails from "./ProductDetails";
import ListRating from "../ListRating";
import moment from "moment";
import { Rating } from "@mui/material";
import { Horizontal } from "@/app/components/Horizontal";
import Avatar from "@/app/components/products/Avatar";

interface Iparams {
  productId?: string;
}
const Product = ({ params }: { params: Iparams }) => {
  return (
    <div>
      <Container>
        <ProductDetails product={product} />
        <div className="flex flex-col mt-20 gap-4 w-[80%]">
          <div>Add rating</div>
          <ListRating product={product} />
          <div className="text-small mt-2 ">
            {product.reviews &&
              product.reviews.map((review) => {
                return (
                  <div key={review.id} className="max-w-300px">
                    <div className="flex gap-2 items-center">
                      {/* <div>Avatar</div> */}
                      <Avatar src={review.user.image} />
                      <div className="font-semibold"> {review?.user.name} </div>
                      <div className="font-light">
                        {moment(review.createdDate).fromNow()}{" "}
                      </div>
                    </div>

                    <div className="mt-2">
                      <Rating value={review.rating} readOnly />
                      <div className="ml-2">{review.comment}</div>
                    </div>

                    <Horizontal length={100} />
                  </div>
                );
              })}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Product;
