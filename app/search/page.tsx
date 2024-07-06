"use client";
import Container from "@/app/components/Container";

import NullData from "@/app/components/NullData";

import { useSearchParams } from "next/navigation";
import useSWR from "swr";
import SearchDetails from "./SearchDetails";
import DetailedSearchBar from "./DetailedSearchBar";

const fetcher = async (url: string) => {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to fetch items");
  }
  return response.json();
};

const MdSearch = () => {
  const searchParams = useSearchParams();
  const searchQuery: any = searchParams ? searchParams?.get("q") : null;
  const encodedSearchQuery = encodeURI(searchQuery || "");

  if (searchQuery) {
    const { data, error, isLoading } = useSWR(
      ` /api/search?q=${encodedSearchQuery}`,
      fetcher
    );
    console.log("data is: 😭" + data);
    if (data && data.length === 0) {
      return (
        <div>
          <DetailedSearchBar />
          <Container>
            <p>There is nothing here...</p>
          </Container>
        </div>
      );
    }
    if (data) {
      return (
        <div className="mt-8 text-center">
          <Container>
            <DetailedSearchBar />
            <h1 className="text-jrl text-6xl my-4 capitalize bold">
              {searchQuery}
            </h1>
            <SearchDetails products={data} />
          </Container>
        </div>
      );
    }
  }
  return <NullData title="Searching..." />;
};

export default MdSearch;
