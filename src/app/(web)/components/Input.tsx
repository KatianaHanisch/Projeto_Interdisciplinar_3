type Props = {
  title: string;
  type: string;
};

export default function Input({ title, type }: Props) {
  return (
    <div className="relative w-full ">
      <input
        type={type}
        id="floating_outlined"
        className="block px-2.5 pb-2.5 pt-2 w-full text-sm text-gray-900 bg-transparent rounded border border-gray-300 appearance-none dark:text-gray-900 dark:border-gray-600 dark:focus:border-gray-500 focus:outline-none focus:ring-0 focus:border-gray-600 peer"
        placeholder=" "
      />
      <label
        htmlFor="floating_outlined"
        className="absolute text-sm text-gray-4 dark:text-gray-700 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-white px-2 peer-focus:px-2 peer-focus:text-gary-600 peer-focus:dark:text-gary-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
      >
        {title}
      </label>
    </div>
  );
}
