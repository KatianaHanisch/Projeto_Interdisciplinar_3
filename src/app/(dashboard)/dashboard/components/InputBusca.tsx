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

  return (
    <>
      <div className="w-11/12 flex items-center justify-center bg-gray-50 py-2 px-3 border border-gray-400 rounded-md">
        <BsSearch color="#89909b" size={20} />
        <input
          type="text"
          value={value}
          placeholder={placeholderInput}
          onChange={handleInputChange}
          className="w-full ml-2 bg-transparent text-base focus:outline-none  text-gray-600 border-l border-gray-300 px-2"
        />
      </div>
    </>
  );
}
