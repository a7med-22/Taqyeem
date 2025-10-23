import { useTranslation } from "react-i18next";
import { Navigate } from "react-router-dom";
import { Button } from "../components/ui/Button.jsx";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/Card.jsx";
import { useAuth } from "../hooks/useAuth.js";
import PageHeader from "../components/ui/PageHeader.jsx";

export default function InterviewsPage() {
  const { t, i18n } = useTranslation();
  const { isAuthenticated } = useAuth();
  const isRTL = i18n.language === "ar";

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className={`min-h-screen bg-animated py-8 ${isRTL ? "rtl" : "ltr"}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <PageHeader 
          title={t("navigation.interviews")}
          subtitle={t("interviews.subtitle")}
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="card-modern">
            <CardHeader>
              <CardTitle className="text-secondary-800 flex items-center gap-2">
                <svg
                  className="w-5 h-5 text-primary-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                {t("interviews.myInterviews")}
              </CardTitle>
              <CardDescription>
                {t("interviews.myInterviewsDescription")}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-secondary-600 mb-4">
                {t("common.noData")}
              </p>
              <Button variant="default" className="w-full">
                {t("interviews.schedule")}
              </Button>
            </CardContent>
          </Card>

          <Card className="card-modern">
            <CardHeader>
              <CardTitle className="text-secondary-800 flex items-center gap-2">
                <svg
                  className="w-5 h-5 text-accent-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                {t("interviews.availableSlots")}
              </CardTitle>
              <CardDescription>
                {t("interviews.availableSlotsDescription")}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-secondary-600 mb-4">
                {t("common.noData")}
              </p>
              <Button variant="outline" className="w-full">
                {t("interviews.viewAll")}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
