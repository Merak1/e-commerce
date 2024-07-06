import DetailedSearch from "../components/searchbar/DetailedSearch";
import SearchBar from "../components/searchbar/SearchBar";

const DetailedSearchBar = () => {
  return (
    <div className="w-full flex ">
      <SearchBar isNavbar={false} />
      <DetailedSearch placeholder={"Filtros..."} />
    </div>
  );
};

export default DetailedSearchBar;
