export const truncateText = (str: string) => {
  // if (str.length > 100) {
  //     return str.substring(0, 100) + "...";
  // }

  if (str.length < 20) {
    return str;
  }

  return str.substring(0, 20) + "...";
};
