"use client";
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the grid
import ActionBtn from "@/app/components/ActionBtn";
import Heading from "@/app/components/Heading";
import Status from "@/app/components/Status";
import { formatPrice } from "@/utils/formatPrice";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Order, User } from "@prisma/client";
import { AgGridReact } from "ag-grid-react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useRef, useState } from "react";
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
  const gridRef = useRef<AgGridReact>(null);
  const [rowData, setRowData] = useState<any>([]);

  if (orders) {
    rows = orders.map((order: any) => {
      //   console.log("order", order);
      const {
        id,
        userId,
        amount,
        currency,
        status,
        deliveryStatus,
        user,
        createDate,
      } = order;

      return {
        id: id,
        userId: userId,
        amount: formatPrice(amount),
        currency: currency,
        status: status,
        deliveryStatus: deliveryStatus,
        userName: user.name,
        userEmail: user.email,
        createDate,
      };
    });
  }

  const AmountCellRenderer = (props: any) => (
    <div className="font-bold text-slate-800 ">{props.value}</div>
  );

  const PaymentStatusCellRenderer = (props: any) => (
    // console.log("props 🥂", props);
    <>
      {props.data.status === "pending" ? (
        <Status
          text="pending"
          bg="bg-slate-200"
          icon={MdAccessTimeFilled}
          color="text-slate-700"
        />
      ) : props.data.status === "complete" ? (
        <Status
          text="complete"
          bg="bg-green-200"
          icon={MdDone}
          color="text-green-700"
        />
      ) : null}
    </>
  );

  const DeliveryStatusCellRenderer = (props: any) => (
    // console.log("props ", props);
    <>
      {props.data.deliveryStatus === "pending" ? (
        <Status
          text="pending"
          bg="bg-slate-200"
          icon={MdAccessTimeFilled}
          color="text-slate-700"
        />
      ) : props.data.deliveryStatus === "dispatched" ? (
        <Status
          text="dispatched"
          bg="bg-purple-200"
          icon={MdDeliveryDining}
          color="text-purple-700"
        />
      ) : props.data.deliveryStatus === "delivered" ? (
        <Status
          text="delivered"
          bg="bg-green-200"
          icon={MdDone}
          color="text-green-700"
        />
      ) : null}
    </>
  );

  const ActionsCellRenderer = (props: any) => (
    <>
      <div className="flex justify-between gap-2">
        <ActionBtn
          icon={MdDeliveryDining}
          onClick={() => handleDispatch(props.data.id)}
        />
        <ActionBtn icon={MdDone} onClick={() => handleDeliver(props.data.id)} />
        <ActionBtn
          icon={MdRemoveRedEye}
          onClick={() => {
            router.push(`/order/${props.data.id}`);
          }}
        />
      </div>
    </>
  );

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

  const [colDefs, setColDefs] = useState([
    { headerName: " id ", field: "id" },
    { headerName: " user ", field: "userName" },
    { headerName: " date ", field: "createDate" },
    { headerName: " email ", field: "userEmail" },
    {
      headerName: " amount ",
      field: "amount",
      cellRenderer: AmountCellRenderer,
    },
    {
      headerName: " paymentStatus ",
      field: "paymentStatus",
      cellRenderer: PaymentStatusCellRenderer,
      // resizable: false,
    },
    {
      headerName: "deliveryStatus ",
      field: "deliveryStatus",
      cellRenderer: DeliveryStatusCellRenderer,
      // resizable: false,
    },
    {
      headerName: " actions",
      field: "action",
      cellRenderer: ActionsCellRenderer,
    },
  ]);
  const autoSizeStrategy: any = {
    type: "fitCellContents",

    columnLimits: [
      {
        colId: "user",
        // maxWidth: 120,
        minWidth: 2000,
      },
    ],
  };
  return (
    <div className="max-w-[1150px] m-auto text-xl">
      <div className="mb-4 mt-8">
        <Heading title="Manage Orders" center />
      </div>
      <div style={{ height: 600, width: "100%" }} className="ag-theme-quartz">
        <AgGridReact
          ref={gridRef}
          rowData={rows}
          columnDefs={colDefs}
          enableCellTextSelection={true}
          ensureDomOrder={true}
          autoSizeStrategy={autoSizeStrategy}
        />
      </div>
    </div>
  );
};

export default ManageOrdersClient;
