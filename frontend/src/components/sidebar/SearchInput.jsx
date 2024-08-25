import { useState } from "react";
import toast from "react-hot-toast";
import { IoSearchSharp } from "react-icons/io5";
import useConversation from "./../../zustand/useConversation";
import useGetConversation from "../../hooks/useGetConversation";

const SearchInput = () => {
  const [search, setSearch] = useState("");
  const { setSelectedConversation } = useConversation();
  const { conversations } = useGetConversation();
  const handleSearch = (e) => {
    e.preventDefault();
    if (!search) return;
    if (search.length < 3) {
      return toast.error("Search must be at least 3 characters long");
    }
    const coversation = conversations.find((c) =>
      c.fullName.toLowerCase().includes(search.toLocaleLowerCase())
    );

    if (coversation) {
      setSelectedConversation(coversation);
      setSearch("");
    } else {
      toast.error("No conversation found with that name");
    }
  };

  return (
    <form onSubmit={handleSearch} className="flex items-center gap-2">
      <input
        type="text"
        placeholder="Search…"
        className="input input-bordered rounded-full"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button type="submit" className="btn btn-circle bg-sky-500 text-white">
        <IoSearchSharp className="w-6 h-6 outline-none" />
      </button>
    </form>
  );
};
export default SearchInput;
