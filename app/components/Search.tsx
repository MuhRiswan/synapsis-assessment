"use client";
import { SearchOutlined } from "@ant-design/icons";
import { Input } from "antd";
import { useSearchParams, usePathname, useRouter } from "next/navigation";

const Search = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = (term: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }
    replace(`${pathname}?${params.toString()}`);
  };
  return (
    <div className="relative flex flex-1  rounded-md shadow-sm">
      <Input
        type="text"
        className="block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        placeholder="Search..."
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
        defaultValue={searchParams.get("query")?.toString() || ""}
      />
      <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
        <SearchOutlined className="w-5 h-5" />
      </div>
    </div>
  );
};

export default Search;
