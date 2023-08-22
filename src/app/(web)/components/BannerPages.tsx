import Image from "next/image";

export default function BannerPages() {
  return (
    <section>
      <div className="hidden md:block">
        <Image
          src="/banner-pages.jpg"
          alt="exemplo"
          width={5000}
          height={300}
          className="max-h-[600px]"
        ></Image>
      </div>

      <div className="block md:hidden">
        <Image
          src="/banner-mobile.jpg"
          alt="exemplo"
          width={5000}
          height={300}
        ></Image>
      </div>
    </section>
  );
}
