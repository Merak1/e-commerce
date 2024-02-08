import Container from "@/app/components/Container";
import ManageOrdersClient from "./ManageOrdersClient";
import getOrders from "@/actions/getOrders";

const ManageOrders = async () => {
  const orders = await getOrders();

  return (
    <div>
      <Container>
        <ManageOrdersClient orders={orders} />
      </Container>
    </div>
  );
};

export default ManageOrders;
