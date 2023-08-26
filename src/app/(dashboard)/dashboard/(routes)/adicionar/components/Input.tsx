type Props = {
  title: string;
  type: string;
};

export default function Input({ title, type }: Props) {
  return (
    <div className="relative w-full mb-3">
      <input
        type={type}
        id="floating_outlined"
        className="block px-2.5 pb-2.5 pt-2 w-full text-sm text-gray-800 bg-gray-100 rounded border border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-gray-600 peer"
        placeholder=" "
      />
      <label
        htmlFor="floating_outlined"
        className="text-gray-700 absolute text-sm text-gray-4 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-gray-100  px-2 peer-focus:px-2 peer-focus:text-gary-600 peer-focus:dark:text-gary-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
      >
        {title}
      </label>
    </div>
  );
}