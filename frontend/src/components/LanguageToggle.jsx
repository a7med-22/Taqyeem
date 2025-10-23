import { useTranslation } from "react-i18next";
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
    <Button
      variant="outline"
      size="sm"
      onClick={toggleLanguage}
      className="min-w-[60px]"
    >
      {language === "en" ? "العربية" : "English"}
    </Button>
  );
}

export function UserMenu() {
  const { user, logout } = useAuth();
  const { t } = useTranslation();

  if (!user) return null;

  const handleLogout = () => {
    logout();
    window.location.href = "/login";
  };

  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-3">
        <Avatar src={user?.avatar} alt={user?.name} />
        <div className="hidden md:block">
          <p className="text-xs text-secondary-600 font-medium uppercase tracking-wide">
            {user?.role ? t(`roles.${user.role}`) : t("roles.candidate")}
          </p>
          <p className="text-sm font-semibold text-secondary-800 capitalize">
            {user?.name || t("auth.user")}
          </p>
        </div>
      </div>
      <Button variant="outline" size="sm" onClick={handleLogout}>
        {t("navigation.logout")}
      </Button>
    </div>
  );
}
