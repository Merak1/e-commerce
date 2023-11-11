"use client";

import Headigng from "../components/Heading";

interface ListRatingProps {
  product: any;
}
const ListRating: React.FC<ListRatingProps> = ({ product }) => {
  return (
    <div>
      <Headigng title="Product Review" />
    </div>
  );
};

export default ListRating;
