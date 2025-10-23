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

export default function LearningPage() {
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
          title={t("navigation.learning")}
          subtitle={t("learning.subtitle")}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
                {t("learning.articles")}
              </CardTitle>
              <CardDescription>
                {t("learning.articlesDescription")}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-secondary-600 mb-4">
                {t("common.noData")}
              </p>
              <Button variant="outline" className="w-full">
                {t("learning.browseArticles")}
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
                    d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                {t("learning.faqs")}
              </CardTitle>
              <CardDescription>{t("learning.faqsDescription")}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-secondary-600 mb-4">
                {t("common.noData")}
              </p>
              <Button variant="ghost" className="w-full">
                {t("learning.viewFAQs")}
              </Button>
            </CardContent>
          </Card>

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
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                  />
                </svg>
                {t("learning.tips")}
              </CardTitle>
              <CardDescription>{t("learning.tipsDescription")}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-secondary-600 mb-4">
                {t("common.noData")}
              </p>
              <Button variant="outline" className="w-full">
                {t("learning.getTips")}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
