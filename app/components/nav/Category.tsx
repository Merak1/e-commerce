import { useRouter, useSearchParams } from "next/navigation";
import { IconType } from "react-icons";

interface CategoryProps {
  label: string;
  icon: IconType;
  selected?: boolean;
}

const Category: React.FC<CategoryProps> = ({ label, icon: Icon, selected }) => {
  const router = useRouter();
  const params = useSearchParams();

  // const handleClick = useCallback(() => {
  //   // if (label === "cámara metalica colores") {
  //   //   router.push("/");
  //   // }
  //   let currentQuery = {};

  //   if (params) {
  //     console.log("params is", params);
  //     currentQuery = queryString.parse(params.toString());
  //     console.log("currentQuery is", currentQuery);
  //   }

  //   const updatedQuery: any = {
  //     ...currentQuery,
  //     category: label,
  //   };

  //   const url = queryString.stringifyUrl(
  //     {
  //       url: "/",
  //       query: updatedQuery,
  //     },
  //     {
  //       skipNull: true,
  //     }
  //   );

  //   router.push(url);
  // }, [label, params, router]);

  const handleClick = () => {
    console.log("label clicked", label);

    const encodedSearchQuery = encodeURI(label);

    router.push(`/search?q=${encodedSearchQuery}`);
  };

  return (
    <div
      onClick={handleClick}
      className={`border m-3 p-3  h-[20vh] cursor-pointer 
        hover:bg-slate-600 hover:text-slate-200 text-center
        rounded
        ${
          selected
            ? "border-b-slate-800 text-slate-800 "
            : "border-transparent text-slate-500"
        }
        `}
    >
      <div>{label}</div>
    </div>
  );
};

export default Category;
