import { useTheme } from "@/app/context/ThemeContext";

type InputBuscaProps = {
  placeholderInput: string;
  value?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSearch: (searchText: string) => void;
};

import { BsSearch } from "react-icons/bs";

export default function InputBusca({
  placeholderInput,
  value,
  onChange,
  onSearch,
}: InputBuscaProps) {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchText = event.target.value;
    onChange(event);
    onSearch(searchText);
  };

  const { themeValue } = useTheme();

  return (
    <>
      <div
        className={`${
          themeValue === "light"
            ? "bg-gray-50 border-gray-400"
            : "bg-gray-600 border-gray-200"
        } b w-11/12 flex items-center justify-center py-2 px-3 border rounded-md`}
      >
        <BsSearch
          color={`${themeValue === "light" ? "#89909b" : "#f3f4f6"}`}
          size={20}
        />
        <input
          type="text"
          value={value}
          placeholder={placeholderInput}
          onChange={handleInputChange}
          className={`${
            themeValue === "light"
              ? "text-gray-600 border-gray-300"
              : "text-gray-100 border-gray-100"
          } w-full ml-2 bg-transparent text-base focus:outline-none border-l px-2`}
        />
      </div>
    </>
  );
}
