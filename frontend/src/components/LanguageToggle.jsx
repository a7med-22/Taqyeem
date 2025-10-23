import { useTranslation } from "react-i18next";
import { useAuth } from "../hooks/useAuth.js";
import { getInitials } from "../utils/helpers.js";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/Avatar.jsx";
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

  return (
    <div className="flex items-center space-x-4">
      <div className="flex items-center space-x-2">
        <Avatar className="h-8 w-8">
          {user.avatarUrl && (
            <AvatarImage src={user.avatarUrl} alt={user.name} />
          )}
          <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
        </Avatar>
        <div className="hidden md:block">
          <p className="text-sm font-medium text-gray-900">{user.name}</p>
          <p className="text-xs text-secondary-600 capitalize">
            {t(`roles.${user.role}`)}
          </p>
        </div>
      </div>
      <Button variant="outline" size="sm" onClick={logout}>
        {t("navigation.logout")}
      </Button>
    </div>
  );
}
