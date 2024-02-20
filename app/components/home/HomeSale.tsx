import Image from "next/image";

interface HomeSaleProps {
  text: string;
}
const HomeSale: React.FC<HomeSaleProps> = ({ text }) => {
  return (
    <div className="h-1/2 flex flex-col justify-center my-auto text-center ">
      <p>{text}</p>
      <Image
        src="/watame3.jpg"
        alt="watame"
        width={250}
        height={200}
        style={{ maxWidth: "100%", height: "auto", margin: "auto" }}
      />
    </div>
  );
};

export default HomeSale;
