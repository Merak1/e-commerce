export const productRating = (data: any) => {
  return (
    data.reviews.reduce((acc: number, item: any) => item.rating + acc, 0) /
    data.reviews.length
  );
};
