"use client";
import ActionBtn from "@/app/components/ActionBtn";
import Heading from "@/app/components/Heading";
import Status from "@/app/components/Status";
import { formatPrice } from "@/utils/formatPrice";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Order, User } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import toast from "react-hot-toast";
import {
  MdAccessTimeFilled,
  MdDeliveryDining,
  MdDone,
  MdRemoveRedEye,
} from "react-icons/md";

interface ManageOrdersClientProps {
  orders: ExtendedOrder[] | undefined;
}

type ExtendedOrder = Order & {
  user: User;
};

const ManageOrdersClient: React.FC<ManageOrdersClientProps> = ({ orders }) => {
  const router = useRouter();
  let rows: any = [];

  if (orders) {
    rows = orders.map((order) => {
      const { userId, amount, currency, status, deliveryStatus, user } = order;
      return {
        id: order.id,
        userId: userId,
        amount: formatPrice(amount),
        currency: currency,
        status: status,
        deliveryStatus: deliveryStatus,
        userName: user.name,
        userEmail: user.email,
      };
    });
  }

  const columns: GridColDef[] = [
    { field: "userId", headerName: "Id", width: 140 },
    { field: "userName", headerName: "User", width: 130 },
    { field: "userEmail", headerName: "Email", width: 160 },
    {
      field: "amount",
      headerName: "Amount",
      width: 120,
      renderCell: (params) => {
        return (
          <div className="font-bold text-slate-800">{params.row.amount} </div>
        );
      },
    },
    {
      field: "paymentStatus",
      headerName: "Payment Status",
      width: 120,
      renderCell: (params) => {
        return (
          <div className="">
            {params.row.status === "pending" ? (
              <Status
                text="pending"
                bg="bg-slate-200"
                icon={MdAccessTimeFilled}
                color="text-slate-700"
              />
            ) : params.row.status === "complete" ? (
              <Status
                text="complete"
                bg="bg-green-200"
                icon={MdDone}
                color="text-green-700"
              />
            ) : null}
          </div>
        );
      },
    },

    {
      field: "deliveryStatus",
      headerName: "Delivery Status",
      width: 120,
      renderCell: (params) => {
        return (
          <div className="">
            {params.row.deliveryStatus === "pending" ? (
              <Status
                text="pending"
                bg="bg-slate-200"
                icon={MdAccessTimeFilled}
                color="text-slate-700"
              />
            ) : params.row.deliveryStatus === "dispatched" ? (
              <Status
                text="dispatched"
                bg="bg-purple-200"
                icon={MdDeliveryDining}
                color="text-purple-700"
              />
            ) : params.row.deliveryStatus === "delivered" ? (
              <Status
                text="delivered"
                bg="bg-green-200"
                icon={MdDone}
                color="text-green-700"
              />
            ) : null}
          </div>
        );
      },
    },

    {
      field: "action",
      headerName: "Actions",
      width: 200,
      renderCell: (params) => {
        const { id } = params.row;
        console.log("id from action cell ", id);
        return (
          <div className="flex justify-between gap-4">
            <ActionBtn
              icon={MdDeliveryDining}
              onClick={() => handleDispatch(id)}
            />
            <ActionBtn icon={MdDone} onClick={() => handleDeliver(id)} />
            <ActionBtn
              icon={MdRemoveRedEye}
              onClick={() => {
                router.push(`/order/${id}`);
              }}
            />
          </div>
        );
      },
    },
  ];

  // TODO Refactor this
  const handleDispatch = useCallback((id: string) => {
    axios
      .put("/api/order", {
        id,
        deliveryStatus: "dispatched",
      })
      .then((response) => {
        toast.success("Order status dispatched!");
        router.refresh();
      })
      .catch((error) => {
        toast.error("Oops! Something went wrong");
        console.log(error);
      });
  }, []);

  const handleDeliver = useCallback((id: string) => {
    axios
      .put("/api/order", {
        id,
        deliveryStatus: "delivered",
      })
      .then((response) => {
        toast.success("Order status delivered!");
        router.refresh();
      })
      .catch((error) => {
        toast.error("Oops! Something went wrong");
        console.log(error);
      });
  }, []);

  return (
    <div className="max-w-[1150px] m-auto text-xl">
      <div className="mb-4 mt-8">
        <Heading title="Manage Orders" center />
      </div>
      <div style={{ height: 600, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 9 },
            },
          }}
          pageSizeOptions={[9, 10]}
          checkboxSelection
          disableRowSelectionOnClick
        />
      </div>
    </div>
  );
};

export default ManageOrdersClient;
