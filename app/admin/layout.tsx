import AdminNav from "../components/admin/AdminNav";

export const metadata = {
  title: "Shop Admin",
  description: "Shop Admin",
};

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <div>
        <AdminNav />
      </div>
      {children}
    </div>
  );
};

export default AdminLayout;
