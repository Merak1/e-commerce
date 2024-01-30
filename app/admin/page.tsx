import { getCurrentUser } from "@/actions/getCurrentUser";
import { redirect } from "next/navigation";

const Admin = async () => {
  const currentUser = await getCurrentUser();
  if (!currentUser || currentUser.role !== "ADMIN") {
    redirect("/");
  }
  return <div className="pt-8">admin page</div>;
};

export default Admin;
