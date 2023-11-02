import Link from "next/link";
import Container from "../Container";
import FooterList from "./FooterList";
import { MdFacebook } from "react-icons/md";
import {
  AiFillInstagram,
  AiFillTwitterCircle,
  AiFillYoutube,
} from "react-icons/ai";

const Footer = () => {
  return (
    <footer
      className="bg-slate-700
    text-slate-200 text-sm mt-16"
    >
      <Container>
        <div
          className="flex flex-col md:flex-row
          justify-between pt-16 bp-8 "
        >
          <FooterList>
            <h3 className="text-base font-bold mb-2">Shop Categories</h3>
            <Link href="#">Phones</Link>
            <Link href="#">Laptops</Link>
            <Link href="#">Desktops</Link>
            <Link href="#">Watches</Link>
            <Link href="#">TVs</Link>
            <Link href="#">Accesories</Link>
          </FooterList>
          <FooterList>
            <h3 className="text-base font-bold mb-2"> Customer Service</h3>
            <Link href="#">Contact Us</Link>
            <Link href="#">Shipping Policy</Link>
            <Link href="#">Returns & Exchanges</Link>
            <Link href="#"></Link>
            <Link href="#">FAQS</Link>
          </FooterList>
          <div className="w-full md:w-1/3 mb-6">
            <h3 className="text-base font-bold mb-2">About us </h3>
            <p className="mb-4">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Voluptatem, quasi.Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Voluptatem, quasi.Lorem ipsum dolor sit amet
              consectetur adipisicing elit. Voluptatem, quasi.
            </p>
            <p>
              &copy; {new Date().getFullYear()} E~shop. All rights reserved{" "}
            </p>
          </div>
          <FooterList>
            <h3 className="text-base font-bold mb-2">Follow us </h3>
            <div className="flex gap-2">
              <Link href="#">
                <AiFillTwitterCircle size={24} />
              </Link>
              <Link href="#">
                <MdFacebook size={24} />
              </Link>
              <Link href="#">
                <AiFillInstagram size={24} />
              </Link>
              <Link href="#">
                <AiFillYoutube size={24} />
              </Link>
            </div>
          </FooterList>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
