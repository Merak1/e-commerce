import Image from "next/image";

const HomeBanner = () => {
  return (
    <div className="relative bg-gradient-to-r from-sky-500 to-sky-700 mb-8">
      <div
        className="mx-auto px-6 py-12 flex felx-col gap-2 md:flex-row
       items-center justify-evenly"
      >
        <div className="mb-8 md:mb text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white">
            Summer Sale!{" "}
          </h1>
          <p className="text-lg md:text-xl text-white">
            Enjoy discounts on selected items
          </p>
          <p className="text-2xl md:text-5xl text-yellow-400 font-bold">
            Get 50% off
          </p>
        </div>
        <div className="w-1/3 relative aspect-video">
          <Image
            // src="/watame.jpg"
            src="/watame.png"
            alt="Banner Image"
            fill
            layout="fill"
            className="object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default HomeBanner;
