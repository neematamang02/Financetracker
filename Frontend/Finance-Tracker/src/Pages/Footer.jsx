import React from "react";
import { Link } from "react-router-dom";
import ROUTES from "../routes/routes";
import { Facebook, Instagram, Linkedin } from "../assets/logo";

const Footer = () => {
  return (
    <footer class="flex flex-col space-y-10 justify-center m-10">
      <nav class="flex justify-center flex-wrap gap-6 text-gray-500 font-medium list-none">
        <li>
          <Link to={ROUTES.HOME} className="hover:text-gray-900">
            Home
          </Link>
        </li>
        <li>
          <Link to={ROUTES.ABOUT_ME} className="hover:text-gray-900">
            About Us
          </Link>
        </li>
        <li>
          <Link to={ROUTES.TESTIMONIALS} className="hover:text-gray-900">
            Testimonials
          </Link>
        </li>
      </nav>

      <div class="flex justify-center space-x-5">
        <a
          href="https://facebook.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={Facebook} />
        </a>
        <a
          href="https://linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={Linkedin} />
        </a>
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={Instagram} />
        </a>
        <a
          href="https://messenger.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src="https://img.icons8.com/fluent/30/000000/facebook-messenger--v2.png" />
        </a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
          <img src="https://img.icons8.com/fluent/30/000000/twitter.png" />
        </a>
      </div>
      <p class="text-center text-gray-700 font-medium">
        &copy; 2025 Company Ltd. All rights reservered.
      </p>
    </footer>
  );
};

export default Footer;
