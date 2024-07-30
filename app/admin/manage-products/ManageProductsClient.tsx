"use client";
import moment from "moment";
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
import { SetStateAction, useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  MdCached,
  MdClose,
  MdDelete,
  MdDone,
  MdRemoveRedEye,
  MdCreate,
} from "react-icons/md";
import { BiSolidDuplicate } from "react-icons/bi";
import Modal from "@mui/material/Modal";
import UpdateProduct from "./UpdateProduct";
import { createContext } from "react";
import { getUniqueString } from "@/utils/uniqueString";

interface ManageProductsClientProps {
  products: Product[] | undefined;
  // images: { color: string; colorCode: string; image: string }[];
  // allDbImages: imagesArray;
  allDbImages: any;
}

export type imagesArray = { color: string; colorCode: string; image: string }[];

const ManageProductsClient: React.FC<ManageProductsClientProps> = ({
  products,
  allDbImages,
}) => {
  const router = useRouter();
  const storage = getStorage(FirebaseApp);
  const [selectedRow, setSelectedRow] = useState({});
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleOpenEditButton = (selectedProduct: any) => {
    console.log("🔴 modifying selected row 🔴 ");
    console.log(selectedProduct);
    setSelectedRow(selectedProduct);
    setOpen(true);
  };

  const handleClose = () => {
    setSelectedRow({});
    setOpen(false);
  };

  useEffect(() => {
    console.log("selectedRow 😃🔴🔴", selectedRow);
  }, [selectedRow]);

  let rows: any = [];

  if (products) {
    rows = products.map((product: any) => {
      const {
        id,
        name,
        price,
        category,
        description,
        brand,
        inStock,
        images,
        sku,
        createDate,
        productType,
      } = product;
      // console.log("product 🧅", product);
      return {
        id: id,
        name: name,
        price: formatPrice(price),
        category: category,
        brand: brand,
        inStock: inStock,
        images: images,
        description: description,
        sku: sku,
        createDate: createDate,
        productType: productType,
      };
    });
  }

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 120 },
    { field: "name", headerName: "Name", width: 150 },
    { field: "sku", headerName: "sku", width: 100 },
    { field: "description", headerName: "description", width: 100 },
    {
      field: "createDate",
      headerName: "created",
      width: 120,
      renderCell: (params) => {
        const date = moment(params.row.createDate).format(
          "MMMM D YYYY, h:mm a"
        );
        // console.log(date);
        return <div className="font- text-slate-800">{date}</div>;
      },
    },
    {
      field: "price",
      headerName: "Price",
      width: 100,
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
      width: 100,
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
      width: 140,
      renderCell: (params) => {
        const { id, inStock, images } = params.row;
        // console.log("params.row", params.row);
        return (
          // <div className="flex  flex-col  flex-wrap gap-0">
          <div className="grid grid-cols-3">
            <ActionBtn
              icon={MdCached}
              action={"change stock status"}
              onClick={() => handleToggleStock(id, inStock)}
            />
            <ActionBtn
              icon={MdRemoveRedEye}
              action={"see product details"}
              onClick={() => {
                router.push(`/product/${id}`);
              }}
            />
            <ActionBtn
              icon={MdDelete}
              action={"delete product"}
              onClick={() => handleDelete(id, images)}
            />
            <ActionBtn
              icon={MdCreate}
              action={"edit product details"}
              // onClick={() => handleOpen()}
              onClick={() => handleOpenEditButton(params.row)}
            />
            <ActionBtn
              icon={BiSolidDuplicate}
              action={"duplicate product"}
              onClick={() => {
                // router.push(`product/${id}`);
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
  const customRef = useCallback((ref: any) => {
    // ref element accessible here
    // console.log("ref ", ref);
  }, []);
  return (
    <div className="max-w-[1150px] m-auto text-xl">
      <div className="mb-4 mt-8">
        <Heading title="Manage products" center />
      </div>
      <Modal
        ref={customRef}
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div ref={customRef} className="bg-backgroundYellow mt-5">
          <UpdateProduct
            formValues={selectedRow}
            key={getUniqueString(8)}
            allDbImages={allDbImages}
          />
        </div>
      </Modal>
      {/* <UpdateProductModal
          open={open}
          handleClose={handleClose}
          selectedRow={selectedRow}

        /> */}
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
          // checkboxSelection
          disableRowSelectionOnClick
          rowHeight={90}
        />
      </div>
    </div>
  );
};

export default ManageProductsClient;
