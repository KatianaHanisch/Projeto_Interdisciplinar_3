export default function Textarea() {
  return (
    <div className="relative w-full ">
      <textarea
        id="floating_outlined"
        placeholder=""
        className="block px-2.5 pb-2.5 pt-2 w-full   text-sm text-gray-800  rounded border border-gray-400 appearance-none focus:outline-none focus:ring-0 focus:border-gray-600 peer"
      />
      <label
        htmlFor="floating_outlined"
        className="text-gray-700 absolute text-sm text-gray-4 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-gary-600 peer-focus:dark:text-gary-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
      >
        Sinopse livro
      </label>
    </div>
  );
}
