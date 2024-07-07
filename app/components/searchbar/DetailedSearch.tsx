interface DetailedSearchProps {
  placeholder: string;
}

const DetailedSearch: React.FC<DetailedSearchProps> = ({ placeholder }) => {
  return (
    <div className={` w-full px-5`}>
      <input
        className="border-[2px] p-1 text-slate-800 rounded-full border-jrl w-full outline-jrl 
        focus:outline active:border-jrl focus:border-jrl "
        type="text"
        placeholder={placeholder}
      />
    </div>
  );
};

export default DetailedSearch;
