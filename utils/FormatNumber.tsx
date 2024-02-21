export const formatNumber = (digit: number) => {
  return new Intl.NumberFormat("mx-MX").format(digit);
};
