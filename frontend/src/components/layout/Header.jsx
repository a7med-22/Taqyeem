import { useTranslation } from "react-i18next";
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
            <a
              href={ROUTES.HOME}
              className="hover:opacity-80 transition-opacity duration-200"
            >
              <AppName className="text-xl font-bold text-gradient" />
            </a>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href={ROUTES.HOME} className="nav-link">
              {t("navigation.home")}
            </a>
            {isAuthenticated && (
              <>
                <a href={ROUTES.DASHBOARD} className="nav-link">
                  {t("navigation.dashboard")}
                </a>
                <a href={ROUTES.INTERVIEWS} className="nav-link">
                  {t("navigation.interviews")}
                </a>
                <a href={ROUTES.LEARNING} className="nav-link">
                  {t("navigation.learning")}
                </a>
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
                  <a href={ROUTES.LOGIN}>{t("navigation.login")}</a>
                </Button>
                <Button size="sm" asChild>
                  <a href={ROUTES.REGISTER}>{t("navigation.register")}</a>
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
