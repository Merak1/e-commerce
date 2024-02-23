import { getCurrentUser } from "@/actions/getCurrentUser";
import { redirect } from "next/navigation";
import Summary from "./Summary";
import getProducts from "@/actions/getProducts";
import getOrders from "@/actions/getOrders";
import getUsers from "@/actions/getUsers";
import Container from "../components/Container";
import BarGraph from "./BarGraph";
import getGraphData from "@/actions/getGraphData";

const Admin = async () => {
  const currentUser = await getCurrentUser();

  const products = await getProducts({ category: null });
  const orders = await getOrders();
  const users = await getUsers();
  // const graphData = await getGraphData();

  if (!currentUser || currentUser.role !== "ADMIN") {
    redirect("/");
  }
  return (
    <div className="pt-8">
      <Container>
        <Summary products={products} orders={orders} users={users} />
        <div className="mt-4 mb-2">
          <BarGraph />
        </div>
      </Container>
    </div>
  );
};

export default Admin;
