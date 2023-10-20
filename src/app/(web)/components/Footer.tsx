export default function Footer({ themeValue }: any) {
  return (
    <footer
      className={`flex justify-center items-center h-[80px] ${
        themeValue === "light"
          ? "bg-light-footerBg"
          : "bg-dark-footerBg border-t border-dark-border text-dark-text"
      }`}
    >
      <h1>PROJETO INTERDISCIPLINAR III</h1>
    </footer>
  );
}
