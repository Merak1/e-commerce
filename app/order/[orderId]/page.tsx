import Container from "@/app/components/Container";

import OrderDetails from "./OrderDetails";
import getOrderById from "@/actions/getOrderById";
import NullData from "@/app/components/NullData";
import GoBackButton from "@/app/components/GoBackButton";

interface Iprams {
  orderId?: any;
}
const Order = async ({ params }: { params: Iprams }) => {
  const order = await getOrderById(params);

  if (order) {
    return (
      <div>
        <Container>
          <OrderDetails order={order} />
          <GoBackButton />
        </Container>
      </div>
    );
  }
  return <NullData title="no order" />;
};

export default Order;
