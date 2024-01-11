import Link from "next/link";
import Container from "../Container";
import { Redressed } from "next/font/google";
import CartCount from "./CartCount";
import UserMenu from "./UserMenu";
import { getCurrentUser } from "@/actions/getCurrentUser";
import Image from "next/image";
import { navbar, catalogButton } from "../../style_classes";
const redressed = Redressed({ subsets: ["latin"], weight: ["400"] });
import { IoLogoWhatsapp } from "react-icons/io";
import { FaFacebookSquare } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";
import { GiSmartphone } from "react-icons/gi";
import { BiSolidOffer } from "react-icons/bi";
import { IoIosStar } from "react-icons/io";
import { FaLocationDot } from "react-icons/fa6";
import { GiHamburgerMenu } from "react-icons/gi";

const NavBar = async () => {
  const currentUser = await getCurrentUser();
  return (
    <div className={navbar}>
      <Container>
        <div className=" py-4 border-b-[1px] flex justify-evenly">
          <div className="md  w-auto ">
            <p>Contáctanos: contacto@jrlmarket.com</p>
          </div>
          <div className="flex w-1/2 justify-evenly">
            <div className="flex items-center">
              <GiSmartphone />
              <p className="pl-2">55 5196 3701</p>
            </div>
            |
            <div className="flex items-center">
              <IoLogoWhatsapp />
              <p className="pl-2">Whatsapp</p>
            </div>
            |
            <div className="flex items-center">
              <FaFacebookSquare />
              <p className="pl-2">Facebook</p>
            </div>
            |
            <div className="flex items-center">
              <FaInstagramSquare />
              <p className="pl-2">Instagram</p>
            </div>
          </div>
        </div>

        <div className=" py-4 border-b-[1px]">
          <div
            className="flex items-center justify-between gap-2 md:gap-0
          "
          >
            <div className="flex  w-1/3  items-center justify-between benis ">
              <Link href="/">
                <div className={catalogButton}>
                  <GiHamburgerMenu />
                  <p className="pl-2"> Cátalogo</p>
                </div>
              </Link>
              <div className="h-5">
                <Link className=" items-center " href="/">
                  <Image
                    src="/jrl_main.png"
                    alt="Banner Image"
                    height={30}
                    width={40}
                    layout="responsive"
                    className="object-scale-down m-auto"
                  />
                </Link>
              </div>
            </div>
            {/* <div className="hidden md:block">Search</div> */}
            <div className="">Search</div>
            <div className="flex justify-between gap-8 md:gap-12">
              <CartCount />
              <UserMenu currentUser={currentUser} />
            </div>
          </div>
        </div>

        <div className=" py-4 border-b-[1px] flex justify-evenly">
          <div className="flex ">
            <div className="mx-5 flex items-center">
              <BiSolidOffer />
              Promociones y Ofertas
            </div>
            |
            <div className="mx-5 flex items-center ">
              <IoIosStar />
              Métodos de Pago
            </div>
            |
            <div className="mx-5 flex items-center ">
              <FaLocationDot />
              Estatus de mi Pedido
            </div>
            |
          </div>
        </div>
      </Container>
    </div>
  );
};

export default NavBar;
