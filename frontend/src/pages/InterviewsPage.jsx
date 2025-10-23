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

export default function InterviewsPage() {
  const { t, i18n } = useTranslation();
  const { isAuthenticated } = useAuth();
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
            {t("navigation.interviews")}
          </h1>
          <p
            className={`text-secondary-700 mt-2 ${
              isRTL ? "font-arabic" : "font-sans"
            }`}
          >
            {t("interviews.subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>{t("interviews.myInterviews")}</CardTitle>
              <CardDescription>
                {t("interviews.myInterviewsDescription")}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-secondary-600">{t("common.noData")}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{t("interviews.availableSlots")}</CardTitle>
              <CardDescription>
                {t("interviews.availableSlotsDescription")}
              </CardDescription>
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
