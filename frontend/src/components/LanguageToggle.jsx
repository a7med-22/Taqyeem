import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";
import { useAuth } from "../hooks/useAuth.js";
import { Avatar } from "./ui/Avatar.jsx";
import { Button } from "./ui/Button.jsx";

export function LanguageToggle() {
  const { language, setLanguage } = useAuth();
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLanguage = language === "en" ? "ar" : "en";
    setLanguage(newLanguage);
    i18n.changeLanguage(newLanguage);
  };

  return (
    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
      <Button
        variant="outline"
        size="sm"
        onClick={toggleLanguage}
        className="min-w-[60px]"
      >
        {language === "en" ? "العربية" : "English"}
      </Button>
    </motion.div>
  );
}

export function UserMenu() {
  const { user, logout } = useAuth();
  const { t } = useTranslation();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  if (!user) return null;

  const handleLogout = () => {
    logout();
    window.location.href = "/login";
  };

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  const dropdownVariants = {
    hidden: {
      opacity: 0,
      y: -10,
      scale: 0.95,
      transition: {
        duration: 0.2,
        ease: "easeOut",
      },
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.2,
        ease: "easeOut",
        staggerChildren: 0.1,
      },
    },
    exit: {
      opacity: 0,
      y: -10,
      scale: 0.95,
      transition: {
        duration: 0.15,
        ease: "easeIn",
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <motion.button
        onClick={toggleDropdown}
        className="flex items-center gap-3 p-3 rounded-xl"
      >
        <Avatar
          src={user?.avatar}
          alt={user?.name}
          className="ring-2 ring-primary-200"
        />
        <div className="hidden md:block text-left">
          <p className="text-xs text-secondary-500 font-medium uppercase tracking-wider">
            {user?.role ? t(`roles.${user.role}`) : t("roles.candidate")}
          </p>
          <p className="text-sm font-semibold text-secondary-800 capitalize">
            {user?.name || t("auth.user")}
          </p>
        </div>
        <motion.svg
          className="w-5 h-5 text-secondary-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          animate={{ rotate: isDropdownOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          />
        </motion.svg>
      </motion.button>

      <AnimatePresence>
        {isDropdownOpen && (
          <motion.div
            className="absolute right-0 mt-3 w-56 bg-white/95 backdrop-blur-[20px] rounded-xl py-2 z-50"
            variants={dropdownVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <motion.div
              variants={itemVariants}
              className="px-4 py-3 border-b border-secondary-100"
            >
              <div className="flex items-center gap-3">
                <Avatar
                  src={user?.avatar}
                  alt={user?.name}
                  className="w-10 h-10 ring-2 ring-primary-200"
                />
                <div>
                  <p className="text-sm font-semibold text-secondary-800 capitalize">
                    {user?.name || t("auth.user")}
                  </p>
                  <p className="text-xs text-secondary-500 font-medium uppercase tracking-wide">
                    {user?.role
                      ? t(`roles.${user.role}`)
                      : t("roles.candidate")}
                  </p>
                </div>
              </div>
            </motion.div>
            <motion.div variants={itemVariants}>
              <NavLink
                to="/profile"
                className="flex items-center px-4 py-3 text-sm text-secondary-700 hover:bg-secondary-50 hover:text-secondary-900 transition-all duration-200 rounded-lg mx-2 my-1"
                onClick={() => setIsDropdownOpen(false)}
              >
                <motion.svg
                  className="w-5 h-5 mr-3 text-primary-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, duration: 0.3 }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </motion.svg>
                {t("navigation.profile")}
              </NavLink>
            </motion.div>
            <motion.div variants={itemVariants}>
              <button
                onClick={() => {
                  handleLogout();
                  setIsDropdownOpen(false);
                }}
                className="flex items-center w-full text-left px-4 py-3 text-sm text-secondary-700 hover:bg-red-50 hover:text-red-700 transition-all duration-200 rounded-lg mx-2 my-1"
              >
                <motion.svg
                  className="w-5 h-5 mr-3 text-red-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.25, duration: 0.3 }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </motion.svg>
                {t("navigation.logout")}
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
