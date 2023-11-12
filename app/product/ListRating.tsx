"use client";

import Heading from "../components/Heading";

interface ListRatingProps {
  product: any;
}
const ListRating: React.FC<ListRatingProps> = ({ product }) => {
  return (
    <div>
      <Heading title="Product Review" />
    </div>
  );
};

export default ListRating;
