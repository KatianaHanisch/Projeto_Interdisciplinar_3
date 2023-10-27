import { useTheme } from "../context/ThemeContext";

type Props = {
  title?: string;
  type: string;
  name?: string;
  value?: string;
  onChange?: any;
};

export default function Input({ title, type, name, value, onChange }: Props) {
  const { themeValue } = useTheme();

  return (
    <div className="relative w-full ">
      <input
        required
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        id="floating_outlined"
        className={`${
          themeValue
            ? themeValue === "light"
              ? "text-light-dashboardText"
              : "text-dark-dashboardText"
            : "text-gray-900"
        } block px-2.5 pb-2.5 pt-2 w-full text-sm  bg-transparent rounded border border-gray-400 appearance-none  focus:outline-none focus:ring-0 focus:border-gray-400 peer`}
        placeholder=" "
      />
      <label
        htmlFor="floating_outlined"
        className={`${
          themeValue === "dark"
            ? "bg-dark-dashboardSecundaryColor text-dark-dashboardText"
            : "bg-light-dashbardWhite text-light-dashboardText"
        } absolute text-sm text-gray-4 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0]  px-2 peer-focus:px-2 peer-focus:text-gary-600 peer-focus:dark:text-gary-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1`}
      >
        {title}
      </label>
    </div>
  );
}
