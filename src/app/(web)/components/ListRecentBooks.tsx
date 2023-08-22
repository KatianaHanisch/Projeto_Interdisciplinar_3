import CardBook from "./CardBook";

export default function ListRecentBooks() {
  return (
    <section className="flex flex-col items-center justify-center">
      <h1 className="md:text-3xl text-2xl mb-16 m-auto text-slate-800 font-medium">
        Livros Recém Adicionados
      </h1>
      <div className="flex m-auto md:gap-[45px] gap-[30px] flex-wrap px-4 max-w-[1200px] justify-center">
        <CardBook />
        <CardBook />
        <CardBook />
        <CardBook />
        <CardBook />
        <CardBook />
        <CardBook />
        <CardBook />
        <CardBook />
        <CardBook />
        <CardBook />
        <CardBook />
      </div>
    </section>
  );
}
