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
      className="
     text-base mt-16
     "
    >
      <Container>
        <div
          className="flex flex-col md:flex-row 
           border-y border-gray-600
          justify-evenly my-8 py-8 bp-8 "
        >
          <div
            className="leading-loose w-full md:w-3/5
            border-b md:border-b-0
           md:border-r md:border-gray-900 md:mb-0
           border-gray-800
           pb-6 px-5 "
          >
            <h3 className="text-jrl font-bold text-xl">Contacto:</h3>
            <p>Teléfono: 55 5196 3701</p>
            <p>Horario: L-V 10:00hrs a 18:00hrs y Sábado 10:00hrs a 14:00hrs</p>
            <p>Correo para Cotizaciones: cotizacion@jrlmarket.com</p>
            <p>Correo para Facturas: facturacion@jrlmarket.com</p>
          </div>

          <div
            className="w-full md:w-2/5 px-5 mx-auto text-center
           pt-6 md:pt-0 "
          >
            <h3 className="text-jrl font-bold text-xl ">Redes Sociales: </h3>
            <div className="flex gap-2 justify-center mt-5">
              <Link href="#">
                <AiFillTwitterCircle size={50} />
              </Link>
              <Link href="#">
                <MdFacebook size={50} />
              </Link>
              <Link href="#">
                <AiFillInstagram size={50} />
              </Link>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-evenly py-8 ">
          <div className="w-full  md:w-3/5">
            <p>
              © 2023 Marca Registrada. Empresa 100% Méxicana. Derechos
              Reservados.
            </p>
          </div>

          <div className="w-full  md:w-2/5 flex flex-row justify-evenly pt-5 md:pt-0">
            <p>Terminos y Condiciones</p>
            <p>Aviso de Privacidad</p>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
