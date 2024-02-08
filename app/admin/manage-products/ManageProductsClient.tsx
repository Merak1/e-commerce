"use client";
import ActionBtn from "@/app/components/ActionBtn";
import Heading from "@/app/components/Heading";
import Status from "@/app/components/Status";
import FirebaseApp from "@/libs/firebase";
import { formatPrice } from "@/utils/formatPrice";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Product } from "@prisma/client";
import axios from "axios";
import { deleteObject, getStorage, ref } from "firebase/storage";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import toast from "react-hot-toast";
import {
  MdCached,
  MdClose,
  MdDelete,
  MdDone,
  MdRemoveRedEye,
} from "react-icons/md";

interface ManageProductsClientProps {
  products: Product[] | undefined;
}

const ManageProductsClient: React.FC<ManageProductsClientProps> = ({
  products,
}) => {
  const router = useRouter();
  const storage = getStorage(FirebaseApp);
  let rows: any = [];
  // console.log("there is no products from manageProductsClient", products);

  if (products) {
    rows = products.map((product) => {
      return {
        id: product.id,
        name: product.name,
        price: formatPrice(product.price),
        category: product.category,
        brand: product.brand,
        inStock: product.inStock,
        images: product.images,
        sku: product.sku,
      };
    });
  }

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "name", headerName: "Name", width: 160 },
    { field: "sku", headerName: "sku", width: 100 },
    {
      field: "price",
      headerName: "Price",
      width: 120,
      renderCell: (params) => {
        return (
          <div className="font-bold text-slate-800">{params.row.price} </div>
        );
      },
    },
    { field: "category", headerName: "Category", width: 120 },
    { field: "brand", headerName: "Brand", width: 80 },
    {
      field: "inStock",
      headerName: "inStock",
      width: 120,
      renderCell: (params) => {
        return (
          <div className="">
            {params.row.inStock === true ? (
              <Status
                text="in stock"
                bg="bg-teal-200"
                icon={MdDone}
                color="text-teal-700"
              />
            ) : (
              <Status
                text="out of stock"
                bg="bg-rose-200"
                icon={MdClose}
                color="text-rose-700"
              />
            )}
          </div>
        );
      },
    },
    // { field: "images", headerName: "images", width: 120 },
    {
      field: "action",
      headerName: "Actions",
      width: 200,
      renderCell: (params) => {
        const { id, inStock, images } = params.row;
        return (
          <div className="flex justify-between gap-4">
            <ActionBtn
              icon={MdCached}
              onClick={() => handleToggleStock(id, inStock)}
            />
            <ActionBtn
              icon={MdDelete}
              onClick={() => handleDelete(id, images)}
            />
            <ActionBtn
              icon={MdRemoveRedEye}
              onClick={() => {
                router.push(`product/${id}`);
              }}
            />
          </div>
        );
      },
    },
  ];

  // TODO Refactor this
  const handleToggleStock = useCallback((id: string, inStock: boolean) => {
    axios
      .put("/api/product", {
        id,
        inStock: !inStock,
      })
      .then((response) => {
        toast.success("Product status changed ");
        router.refresh();
      })
      .catch((error) => {
        toast.error("Oops! Something went wrong");
        console.log(error);
      });
  }, []);

  const handleDelete = useCallback(async (id: string, images: any[]) => {
    toast("Deleting product, please wait...");

    const handleImageDelete = async () => {
      try {
        for (const item of images) {
          if (item.image) {
            const imageRef = ref(storage, item.image);
            await deleteObject(imageRef);

            console.log("image deleeted, ", item.image);
          }
        }
      } catch (error) {
        return console.log("Deleting images error: " + error);
      }
    };

    await handleImageDelete();

    axios
      .delete(`/api/product/${id}`)
      .then((response) => {
        toast.success("Product Deleted ");
        router.refresh();
      })
      .catch((error) => {
        toast.error("Oops! Failed to delete product");
        console.log(error);
      });
  }, []);

  return (
    <div className="max-w-[1150px] m-auto text-xl">
      <div className="mb-4 mt-8">
        <Heading title="Manage products" center />
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

export default ManageProductsClient;
