import { Link } from "react-router-dom";
import {
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
  MessageCircle,
} from "lucide-react";
import ROUTES from "../routes/routes";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const navigationLinks = [
    { name: "Home", path: ROUTES.HOME },
    { name: "About Us", path: ROUTES.ABOUT_ME },
    { name: "Testimonials", path: ROUTES.TESTIMONIALS },
  ];

  const socialLinks = [
    {
      name: "Facebook",
      href: "https://facebook.com",
      icon: Facebook,
      color: "hover:text-blue-600",
    },
    {
      name: "LinkedIn",
      href: "https://linkedin.com",
      icon: Linkedin,
      color: "hover:text-blue-700",
    },
    {
      name: "Instagram",
      href: "https://instagram.com",
      icon: Instagram,
      color: "hover:text-pink-600",
    },
    {
      name: "Twitter",
      href: "https://twitter.com",
      icon: Twitter,
      color: "hover:text-blue-400",
    },
    {
      name: "Messenger",
      href: "https://messenger.com",
      icon: MessageCircle,
      color: "hover:text-blue-500",
    },
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-5xl mx-auto px-6 py-12">
        {/* Main Content */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600 text-white font-bold text-lg">
              M
            </div>
            <div>
              <h3 className="text-xl font-bold">Moneymate</h3>
              <p className="text-sm text-gray-400">
                Personal Finance Made Simple
              </p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex flex-wrap justify-center gap-8">
            {navigationLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="text-gray-300 hover:text-white transition-colors duration-200 font-medium"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex h-10 w-10 items-center justify-center rounded-full bg-gray-800 text-gray-400 hover:bg-gray-700 ${social.color} transition-all duration-200 hover:scale-105`}
                aria-label={`Follow us on ${social.name}`}
              >
                <social.icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 my-8"></div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
          <p>&copy; {currentYear} FinanceApp Ltd. All rights reserved.</p>
          <div className="flex gap-6">
            <Link to="#" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link to="#" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
