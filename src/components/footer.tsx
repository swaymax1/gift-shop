import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white p-4 flex justify-center items-center">
      <a
        href="https://www.instagram.com/your-instagram-link/"
        target="_blank"
        rel="noopener noreferrer"
        className="mr-3"
      >
        <i className="fab fa-instagram text-2xl"></i>
      </a>
      <a
        href="https://www.tiktok.com/@your-tiktok-link/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <i className="fab fa-tiktok text-2xl"></i>
      </a>
    </footer>
  );
};

export default Footer;
