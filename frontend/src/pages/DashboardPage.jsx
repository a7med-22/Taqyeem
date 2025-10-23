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

export default function DashboardPage() {
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
            {t("dashboard.welcome")}, {user?.name}
          </h1>
          <p
            className={`text-secondary-700 mt-2 ${
              isRTL ? "font-arabic" : "font-sans"
            }`}
          >
            {t("dashboard.subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>{t("dashboard.upcomingInterviews")}</CardTitle>
              <CardDescription>
                {t("dashboard.upcomingInterviewsDescription")}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-secondary-600">{t("common.noData")}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{t("dashboard.recentActivity")}</CardTitle>
              <CardDescription>
                {t("dashboard.recentActivityDescription")}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-secondary-600">{t("common.noData")}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{t("dashboard.quickActions")}</CardTitle>
              <CardDescription>
                {t("dashboard.quickActionsDescription")}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <a
                  href="/interviews"
                  className="block text-sm text-primary-600 hover:text-primary-500"
                >
                  {t("interviews.schedule")}
                </a>
                <a
                  href="/learning"
                  className="block text-sm text-primary-600 hover:text-primary-500"
                >
                  {t("learning.articles")}
                </a>
                <a
                  href="/profile"
                  className="block text-sm text-primary-600 hover:text-primary-500"
                >
                  {t("profile.editProfile")}
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
