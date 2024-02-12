import { formatPrice } from "@/utils/formatPrice";
import { truncateText } from "@/utils/truncateText";
import { CartProductType } from "@prisma/client";
import Image from "next/image";

interface OrderItemProps {
  item: CartProductType;
}

const OrderItem: React.FC<OrderItemProps> = ({ item }) => {
  const {
    id,
    name,
    description,
    category,
    brand,
    quantity,
    price,
    selectedImage,
  } = item;
  const { color, colorCode, image } = selectedImage;
  return (
    <div
      className="grid grid-cols-5 text-xs md:text-sm items-center
                gap-4 border-t-[1.5px] border-slate-200 py-4 "
    >
      <div className="col-span-2 justify-start flex gap-2 md:gap-4">
        <div className="relative w-[70px] aspect-square ">
          <Image src={image} alt={name} fill className="object-contain" />
        </div>
        <div className="flex flex-col gap-1">
          <div>{truncateText(name)}</div>
          <div>{color}</div>
        </div>
      </div>
      <div className="justify-self-center ">{formatPrice(price)}</div>
      <div className="justify-self-center ">{quantity}</div>
      <div className="justify-self-end font-semibold">
        {(quantity * price).toFixed(2)}
      </div>
    </div>
  );
};

export default OrderItem;
