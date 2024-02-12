import Container from "@/app/components/Container";
import getOrders from "@/actions/getOrders";
import { getCurrentUser } from "@/actions/getCurrentUser";
import NullData from "../components/NullData";
import getOrdersById from "@/actions/getOrdersByUserId";
import OrdersClient from "./OrderClient";

const Orders = async () => {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return <NullData title="opps" />;
  }
  const orders = await getOrdersById(currentUser.id);

  if (!orders) {
    return <NullData title="You dont have orders " />; //redirect to beggingn
  }

  return (
    <div>
      <Container>
        <OrdersClient orders={orders} />
      </Container>
    </div>
  );
};

export default Orders;
