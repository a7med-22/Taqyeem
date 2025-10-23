import { useTranslation } from "react-i18next";
import { Navigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/Card.jsx";
import { USER_ROLES } from "../config/app.js";
import { useAuth } from "../hooks/useAuth.js";

export default function AdminPage() {
  const { t, i18n } = useTranslation();
  const { isAuthenticated, user } = useAuth();
  const isRTL = i18n.language === "ar";

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (user?.role !== USER_ROLES.ADMIN) {
    return <Navigate to="/dashboard" replace />;
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
            {t("navigation.admin")}
          </h1>
          <p
            className={`text-secondary-700 mt-2 ${
              isRTL ? "font-arabic" : "font-sans"
            }`}
          >
            {t("admin.subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>{t("admin.users")}</CardTitle>
              <CardDescription>{t("admin.usersDescription")}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-secondary-600">{t("common.noData")}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{t("admin.sessions")}</CardTitle>
              <CardDescription>
                {t("admin.sessionsDescription")}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-secondary-600">{t("common.noData")}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{t("admin.content")}</CardTitle>
              <CardDescription>{t("admin.contentDescription")}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-secondary-600">{t("common.noData")}</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
