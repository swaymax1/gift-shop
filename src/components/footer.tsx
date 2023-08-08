import { AiOutlineInstagram } from "react-icons/ai";
import { BsTiktok } from "react-icons/bs";

export default function Footer({classes} : any) {
  return (
    <footer
      className={`text-white py-4 text-center flex flex-col items-center justify-center mt-20 ${classes}`}
    >
      <div className="flex items-center justify-center mb-4">
        <a
          href="https://www.instagram.com/yourgift1__/"
          target="_blank"
          rel="noopener noreferrer"
          className="mr-10 text-2xl"
        >
          <AiOutlineInstagram />
        </a>
        <a
          href="https://www.tiktok.com/@yourgift1___"
          target="_blank"
          rel="noopener noreferrer"
          className="text-2xl"
        >
          <BsTiktok />
        </a>
      </div>
      <p className="">All rights reserved © Your Gifts</p>
    </footer>
  );
}
