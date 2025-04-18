import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import ROUTES from "@/routes/routes";
import { useNavigate } from "react-router-dom";
const navLinks = [
  { label: "Home", href: "#" },
  { label: "Features", href: "#" },
  { label: "FAQ", href: "#" },
  { label: "Process", href: "#" },
];

const Navbar = () => {
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);

  const loginNavigate = () => {
    navigate(ROUTES.Login_Page);
  };
  const signupNavigate = () => {
    navigate(ROUTES.Register_page);
  };
  return (
    <section className="py-4 px-4 md:px-0 lg:py-6 fixed top-0 left-0 right-0 z-50">
      <div className="container max-w-4xl md:mx-auto">
        <div className="grid grid-cols-2 backdrop-filter md:backdrop-blur-md text-black lg:grid-cols-3 bg-white/70 rounded-xl p-2 px-4 md:pr-2 items-center">
          {/* Logo */}
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-9 md:h-11 w-auto ml-2"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
              <path d="M4 16h4v-7l4 4l4 -4v7h4" />
            </svg>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex justify-center items-center">
            <nav className="flex gap-6 font-medium">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="hover:underline"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Actions */}
          <div className="flex justify-end items-center gap-4">
            {/* Menu Toggle (Mobile) */}
            <button
              className="md:hidden hover:bg-zinc-700 p-2 rounded-full duration-400 ease-in-out"
              aria-label="Open menu"
              onClick={() => setIsOpen(true)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="icon-tabler icon-tabler-menu-4"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M7 6h10" />
                <path d="M4 12h16" />
                <path d="M7 18h10" />
              </svg>
            </button>

            {/* Desktop Buttons */}
            <Button
              variant="ghost"
              className="hidden md:inline-flex cursor-pointer"
              onClick={loginNavigate}
            >
              Log In
            </Button>
            <Button
              className="hidden md:inline-flex cursor-pointer"
              onClick={signupNavigate}
            >
              Sign Up
            </Button>
          </div>

          {/* Mobile Menu Drawer */}
          <AnimatePresence>
            {isOpen && (
              <>
                {/* Backdrop */}
                <motion.div
                  className="fixed inset-0 bg-black/30 backdrop-filter backdrop-blur-lg z-40"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  onClick={() => setIsOpen(false)}
                />

                {/* Drawer Panel */}
                <motion.div
                  className="fixed top-15 right-2 rounded-xl h-[60%] w-3/4 max-w-xs bg-gray-100/60 backdrop-filter backdrop-blur-sm text-black z-50 flex flex-col p-6 shadow-lg"
                  initial={{ x: "100%" }}
                  animate={{ x: 0 }}
                  exit={{ x: "100%" }}
                  transition={{
                    type: "tween",
                    duration: 0.3,
                    delayChildren: 0.2,
                  }}
                >
                  {/* Close Button */}
                  <div className="flex justify-end">
                    <button
                      aria-label="Close menu"
                      onClick={() => setIsOpen(false)}
                      className="hover:bg-zinc-200 p-1 rounded-full duration-200 ease-in-out"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="icon-tabler icon-tabler-x"
                      >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M18 6l-12 12" />
                        <path d="M6 6l12 12" />
                      </svg>
                    </button>
                  </div>

                  {/* Nav Links & Buttons */}
                  <nav className="flex flex-col gap-4 mt-8 font-medium">
                    {navLinks.map((link) => (
                      <a
                        key={link.label}
                        href={link.href}
                        className="py-2 hover:underline"
                      >
                        {link.label}
                      </a>
                    ))}
                  </nav>

                  <div className="mt-auto flex flex-col gap-3">
                    <Button
                      variant="ghost"
                      className="cursor-pointer"
                      onClick={() => {
                        setIsOpen(false);
                        loginNavigate();
                      }}
                    >
                      Log In
                    </Button>
                    <Button
                      className="cursor-pointer"
                      onClick={() => {
                        setIsOpen(false);
                        signupNavigate();
                      }}
                    >
                      Sign Up
                    </Button>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default Navbar;
