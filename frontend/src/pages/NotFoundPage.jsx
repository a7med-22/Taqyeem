import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { AppName } from "../components/AppName.jsx";
import { Button } from "../components/ui/Button.jsx";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/Card.jsx";

export default function NotFoundPage() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const isRTL = i18n.language === "ar";

  return (
    <div
      className={`min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 ${
        isRTL ? "rtl" : "ltr"
      }`}
    >
      <div className="max-w-md w-full text-center">
        <AppName className="mb-8" />

        <Card>
          <CardHeader>
            <div className="text-6xl font-bold text-primary-600 mb-4">404</div>
            <CardTitle className="text-2xl">{t("errors.notFound")}</CardTitle>
            <CardDescription>{t("errors.pageNotFound")}</CardDescription>
          </CardHeader>
          <CardContent>
            <p
              className={`text-secondary-700 mb-6 ${
                isRTL ? "font-arabic" : "font-sans"
              }`}
            >
              {t("errors.pageNotFoundDescription")}
            </p>
            <Button onClick={() => navigate("/")}>
              {t("common.backToHome")}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
