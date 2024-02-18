"use client";

import { useRouter } from "next/navigation";
import { FieldValues, useForm } from "react-hook-form";
import { MdSearch } from "react-icons/md";

const SearchBar = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      searchTerm: "",
    },
  });

  const onSubmit = async (data: any) => {
    console.log("data.searchTerm ", data.searchTerm);
    if (!data.searchTerm) {
      router.push("/");
    }

    const encodedSearchQuery = encodeURI(data.searchTerm);

    router.push(`/search?q=${encodedSearchQuery}`);
    reset();
  };

  return (
    <div className="flex items-center">
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          className="p-2 border border-gray-300
        rounded-lg focus:outline active:border-jrl
        focus:border-jrl
        "
          autoComplete="off"
          placeholder="Buscar ..."
          type="text"
          {...register("searchTerm")}
          id="searchTerm"
        />
        <button
          type="submit"
          className=" hover:opacity:80 text-slate-700 p-2 rounded-md"
        >
          <MdSearch />
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
