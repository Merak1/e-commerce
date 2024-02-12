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
  order: Order;
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
  } = order;
  return (
    <>
      <div className="max-w-[1150px] m-auto flex flex-col gap-2">
        <div className="mt-8">
          <Heading title="Order Details" />

          <div>Order Id: {id} </div>
          <div>
            Total: <span className="font-bold">{formatPrice(amount)}</span>{" "}
          </div>

          <div className="flex gap-2 items-center">
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

          <div className="flex gap-2 items-center">
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

          <div>Date: {moment(createDate).fromNow()}</div>
          <div>
            <h2 className="font-semibold mt-4 mb-2">Products ordered</h2>
            <div className="grid grid-cols-5 text-xs gap-4 pb-2 items-center">
              <div className="col-span-2 justify-self-start">Product</div>
              <div className="justify-self-center">Price</div>
              <div className="justify-self-center">Quantity</div>
              <div className="justify-self-end">Total</div>
            </div>
            {order.products &&
              order.products.map((item) => {
                return <OrderItem key={item.id} item={item} />;
              })}
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderDetails;
