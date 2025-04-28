// src/components/Navbar.jsx
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import ROUTES from "@/routes/routes";
import { useNavigate, useLocation } from "react-router-dom";

const navLinks = [
  { label: "Home", id: "home" },
  { label: "Features", id: "features" },
  { label: "FAQ", id: "faq" },
  { label: "Process", id: "process" },
];

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  // scroll to a section (with nice smooth behavior)
  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // handles nav clicks
  const onNavClick = (id) => {
    setIsOpen(false);
    if (location.pathname !== ROUTES.HOME) {
      // go to “/” with a bit of state so Homepage can pick it up
      navigate(ROUTES.HOME, { state: { scrollTo: id } });
    } else {
      scrollToSection(id);
    }
  };

  const loginNavigate = () => navigate(ROUTES.Login_Page);
  const signupNavigate = () => navigate(ROUTES.Register_page);

  return (
    <section className="py-4 px-4 md:px-0 lg:py-6 fixed top-0 left-0 right-0 z-50">
      <div className="container max-w-4xl md:mx-auto">
        <div className="grid grid-cols-2 backdrop-filter md:backdrop-blur-md text-black lg:grid-cols-3 bg-white/70 rounded-xl p-2 px-4 md:pr-2 items-center">
          {/* Logo */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#0000FF"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            class="icon icon-tabler icons-tabler-outline icon-tabler-coin-monero"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
            <path d="M4 16h4v-7l4 4l4 -4v7h4" />
          </svg>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex justify-center items-center">
            <nav className="flex gap-6 font-medium">
              {navLinks.map(({ label, id }) => (
                <button
                  key={id}
                  onClick={() => onNavClick(id)}
                  className="hover:underline cursor-pointer"
                >
                  {label}
                </button>
              ))}
            </nav>
          </div>

          {/* Actions */}
          <div className="flex justify-end items-center gap-4">
            <button
              className="md:hidden hover:bg-zinc-300 p-2 rounded-full transition cursor-pointer duration-300 ease-in-out"
              onClick={() => setIsOpen(true)}
            >
              {/* menu icon */}
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
                class="icon icon-tabler icons-tabler-outline icon-tabler-menu-4"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M7 6h10" />
                <path d="M4 12h16" />
                <path d="M7 12h13" />
                <path d="M7 18h10" />
              </svg>
            </button>

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

          {/* Mobile Drawer */}
          <AnimatePresence>
            {isOpen && (
              <>
                <motion.div
                  className="fixed inset-0 bg-black/30 backdrop-blur-lg z-40"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setIsOpen(false)}
                />
                <motion.div
                  className="fixed top-16 right-2 w-3/4 max-w-xs bg-gray-100/60 backdrop-blur-sm z-50 flex flex-col p-6 rounded-xl shadow-lg"
                  initial={{ x: "100%" }}
                  animate={{ x: 0 }}
                  exit={{ x: "100%" }}
                  transition={{
                    type: "tween",
                    duration: 0.3,
                    delayChildren: 0.2,
                  }}
                >
                  <button
                    aria-label="Close menu"
                    onClick={() => setIsOpen(false)}
                    className="self-end p-1 rounded-full transition cursor-pointer duration-300 ease-in-out"
                  >
                    {/* x icon */}
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
                      class="icon icon-tabler icons-tabler-outline icon-tabler-x hover:rotate-90 duration-300 ease-in-out"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <path d="M18 6l-12 12" />
                      <path d="M6 6l12 12" />
                    </svg>
                  </button>

                  <nav className="flex flex-col gap-4 mt-6 font-medium">
                    {navLinks.map(({ label, id }) => (
                      <button
                        key={id}
                        onClick={() => onNavClick(id)}
                        className="py-2 hover:underline text-left"
                      >
                        {label}
                      </button>
                    ))}
                  </nav>

                  <div className="mt-auto flex flex-col gap-3">
                    <Button
                      variant="ghost"
                      onClick={() => {
                        setIsOpen(false);
                        loginNavigate();
                      }}
                    >
                      Log In
                    </Button>
                    <Button
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
