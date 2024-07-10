import { getCurrentUser } from "@/actions/getCurrentUser";
import { redirect } from "next/navigation";
import Summary from "./Summary";
import getProducts from "@/actions/getProducts";
import getOrders from "@/actions/getOrders";
import getUsers from "@/actions/getUsers";
import Container from "../components/Container";
import BarGraph from "./BarGraph";
import getGraphData from "@/actions/getGraphData";
import { createContext } from "react";
import getImages from "@/actions/getImages";

const Admin = async () => {
  const currentUser = await getCurrentUser();

  const products = await getProducts({ category: null });
  const orders = await getOrders();
  const users = await getUsers();

  const images = await getImages({ category: null });

  // const graphData = await getGraphData();

  if (!currentUser || currentUser.role !== "ADMIN") {
    redirect("/");
  }
  console.log("BENIS DE BOLLO 🍓🍓🍓 ", images);

  return (
    <div className="pt-8">
      <Container>
        <Summary products={products} orders={orders} users={users} />
        <div className="mt-4 mb-2">
          <BarGraph allDbImages={images} />
        </div>
      </Container>
    </div>
  );
};

export default Admin;
