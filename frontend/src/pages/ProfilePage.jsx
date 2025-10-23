import { useTranslation } from "react-i18next";
import { Navigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/Card.jsx";
import { useAuth } from "../hooks/useAuth.js";

export default function ProfilePage() {
  const { t, i18n } = useTranslation();
  const { isAuthenticated, user } = useAuth();
  const isRTL = i18n.language === "ar";

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className={`min-h-screen bg-gray-50 py-8 ${isRTL ? "rtl" : "ltr"}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1
            className={`text-3xl font-bold text-secondary-900 ${
              isRTL ? "font-arabic" : "font-sans"
            }`}
          >
            {t("navigation.profile")}
          </h1>
          <p
            className={`text-secondary-700 mt-2 ${
              isRTL ? "font-arabic" : "font-sans"
            }`}
          >
            {t("profile.subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>{t("profile.personalInfo")}</CardTitle>
              <CardDescription>
                {t("profile.personalInfoDescription")}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    {t("auth.name")}
                  </label>
                  <p className="text-sm text-secondary-900">{user?.name}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    {t("auth.email")}
                  </label>
                  <p className="text-sm text-secondary-900">{user?.email}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    {t("auth.role")}
                  </label>
                  <p className="text-sm text-secondary-900 capitalize">
                    {t(`roles.${user?.role}`)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{t("profile.accountSettings")}</CardTitle>
              <CardDescription>
                {t("profile.accountSettingsDescription")}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    {t("profile.language")}
                  </label>
                  <p className="text-sm text-secondary-900">
                    {user?.language === "ar" ? "العربية" : "English"}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    {t("profile.memberSince")}
                  </label>
                  <p className="text-sm text-secondary-900">
                    {user?.createdAt
                      ? new Date(user.createdAt).toLocaleDateString()
                      : "N/A"}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
