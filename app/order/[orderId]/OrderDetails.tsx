"use client";

import Heading from "@/app/components/Heading";
import Status from "@/app/components/Status";
import { formatPrice } from "@/utils/formatPrice";
import { Order } from "@prisma/client";
import moment from "moment";
import { useRouter } from "next/navigation";
import { MdAccessTimeFilled, MdDeliveryDining, MdDone } from "react-icons/md";
import OrderItem from "./OrderItem";

interface OrderDetailsProps {
  // order: Order;
  order: any;
}
const OrderDetails: React.FC<OrderDetailsProps> = ({ order }) => {
  const {
    id,
    userId,
    amount,
    currency,
    status,
    deliveryStatus,
    createDate,
    paymentIntentId,
    shippingDetails,
  } = order;
  const { success, order_id, data: shippingDetailsData } = shippingDetails;
  const { trackingNumber, amount: shippingAmount } = shippingDetailsData;

  return (
    <>
      <div className="max-w-[1150px] m-auto flex flex-col gap-2 ">
        <div className="mt-5">
          <Heading title="Order Details" />
        </div>
        <div className="mt-8 pb-5 text-center">
          <p className="font-bold  p-5">Order: {id} </p>
          <div className="pt-2">
            Total:{" "}
            <span className="font-bold">{formatPrice(amount / 100)}</span>{" "}
          </div>
          <div className="flex justify-evenly ">
            <div className="left-side pt-2">
              <div className="flex gap-2 items-center pt-2">
                <div>Payment Status : </div>
                <div>
                  {status === "pending" ? (
                    <Status
                      text="pending"
                      icon={MdAccessTimeFilled}
                      bg="bg-slate-200"
                      color="text-slate-700"
                    />
                  ) : status === "complete" ? (
                    <Status
                      text="complete"
                      icon={MdDone}
                      bg="bg-teal-200"
                      color="text-teal-700"
                    />
                  ) : (
                    <></>
                  )}
                </div>
              </div>

              <div className="pt-2">
                <p>trackingNumber: {trackingNumber}</p>
              </div>
            </div>
            <div className="right-side pt-2">
              <div className="flex gap-2 items-center pt-2">
                <div>Delivery Status : </div>
                <div>
                  {deliveryStatus === "pending" ? (
                    <Status
                      text="pending"
                      icon={MdAccessTimeFilled}
                      bg="bg-slate-200"
                      color="text-slate-700"
                    />
                  ) : deliveryStatus === "dispatched" ? (
                    <Status
                      text="dispatched"
                      icon={MdDeliveryDining}
                      bg="bg-purple-200"
                      color="text-purple-700"
                    />
                  ) : deliveryStatus === "delivered" ? (
                    <Status
                      text="delivered"
                      icon={MdDone}
                      bg="bg-green-200"
                      color="text-green-700"
                    />
                  ) : (
                    <></>
                  )}
                </div>
              </div>
              <div className="pt-2">Date: {moment(createDate).fromNow()}</div>
            </div>
          </div>
          <div>
            <h2 className="font-semibold mt-4 mb-2">Products ordered</h2>
            <div className="grid grid-cols-5 text-xs gap-4 pb-2 items-center">
              <div className="col-span-2 justify-self-start">Product</div>
              <div className="justify-self-center">Price</div>
              <div className="justify-self-center">Quantity</div>
              <div className="justify-self-end">Total</div>
            </div>
            {order.products &&
              order.products.map((item: any) => {
                return <OrderItem key={item.id} item={item} />;
              })}
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderDetails;
