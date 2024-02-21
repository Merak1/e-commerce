import { getCurrentUser } from "@/actions/getCurrentUser";
import { redirect } from "next/navigation";
import Summary from "./Summary";
import getProducts from "@/actions/getProducts";
import getOrders from "@/actions/getOrders";
import getUsers from "@/actions/getUsers";
import Container from "../components/Container";

const Admin = async () => {
  const currentUser = await getCurrentUser();

  const products = await getProducts({ category: null });
  const orders = await getOrders();
  const users = await getUsers();

  if (!currentUser || currentUser.role !== "ADMIN") {
    redirect("/");
  }
  return (
    <div className="pt-8">
      <Container>
        <Summary products={products} orders={orders} users={users} />
      </Container>
    </div>
  );
};

export default Admin;
