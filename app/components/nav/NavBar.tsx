import Link from "next/link";
import Container from "../Container";
import { Redressed } from "next/font/google";

const redressed = Redressed({ subsets: ["latin"], weight: ["400"] });

const NavBar = () => {
  return (
    <div
      className="
        NavBar
        sticky
        w-full
        bg-slate-200
        z-30
        shadow-small"
    >
      <div className=" py-4 border-b-[1px]">
        <Container>
          <div
            className="flex items-center justify-between gap-3 md:gap-0
          "
          >
            <Link
              className={`${redressed.className} font-bold text-2xl`}
              href="/"
            >
              Eshop
            </Link>
            <div className="hidden md:block">Search</div>
            <div className="flex justify-between gap-8 md:gap-12">
              <div>CartCount</div>
              <div>UserMenu</div>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default NavBar;