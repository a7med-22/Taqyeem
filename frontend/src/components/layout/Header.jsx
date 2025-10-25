import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";
import { ROUTES } from "../../config/app.js";
import { useAuth } from "../../hooks/useAuth.js";
import { AppName } from "../AppName.jsx";
import { LanguageToggle, UserMenu } from "../LanguageToggle.jsx";
import { Button } from "../ui/Button.jsx";

export function Header() {
  const { isAuthenticated } = useAuth();
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";

  return (
    <header className={`sticky top-0 z-50 nav-modern ${isRTL ? "rtl" : "ltr"}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <NavLink
              to={ROUTES.HOME}
              className="hover:opacity-80 transition-opacity duration-200"
            >
              <AppName className="text-xl font-bold text-gradient" />
            </NavLink>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <NavLink
              to={ROUTES.HOME}
              className={({ isActive }) =>
                `nav-link ${isActive ? "nav-link-active" : ""}`
              }
            >
              {t("navigation.home")}
            </NavLink>
            {isAuthenticated && (
              <>
                <NavLink
                  to={ROUTES.DASHBOARD}
                  className={({ isActive }) =>
                    `nav-link ${isActive ? "nav-link-active" : ""}`
                  }
                >
                  {t("navigation.dashboard")}
                </NavLink>
                <NavLink
                  to={ROUTES.INTERVIEWS}
                  className={({ isActive }) =>
                    `nav-link ${isActive ? "nav-link-active" : ""}`
                  }
                >
                  {t("navigation.interviews")}
                </NavLink>
                <NavLink
                  to={ROUTES.LEARNING}
                  className={({ isActive }) =>
                    `nav-link ${isActive ? "nav-link-active" : ""}`
                  }
                >
                  {t("navigation.learning")}
                </NavLink>
              </>
            )}
          </nav>

          {/* Right side */}
          <div className="flex items-center space-x-4">
            <LanguageToggle />
            {isAuthenticated ? (
              <UserMenu />
            ) : (
              <div className="flex items-center space-x-3">
                <Button variant="outline" size="sm" asChild>
                  <NavLink to={ROUTES.LOGIN}>{t("navigation.login")}</NavLink>
                </Button>
                <Button size="sm" asChild>
                  <NavLink to={ROUTES.REGISTER}>
                    {t("navigation.register")}
                  </NavLink>
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
