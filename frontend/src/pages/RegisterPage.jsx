import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
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
import { Input } from "../components/ui/Input.jsx";
import { PasswordInput } from "../components/ui/PasswordInput.jsx";
import { ROUTES } from "../config/app.js";
import { useRegister } from "../hooks/api.js";
import { useAuth } from "../hooks/useAuth.js";

export default function RegisterPage() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const isRTL = i18n.language === "ar";
  const registerMutation = useRegister();
  const { login } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  const password = watch("password");

  const onSubmit = async (data) => {
    try {
      const response = await registerMutation.mutateAsync(data);

      // Update the auth context with the registration data
      login(response.data.user, response.data.token);

      toast.success(t("auth.registerSuccess"));

      // Use React Router navigation instead of window.location
      navigate(ROUTES.DASHBOARD);
    } catch (error) {
      console.error("Registration error:", error);
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        t("errors.genericError");
      toast.error(errorMessage);
    }
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center bg-animated py-12 px-4 sm:px-6 lg:px-8 ${
        isRTL ? "rtl" : "ltr"
      }`}
    >
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <AppName showDescription className="mb-8" />
        </div>

        <Card>
          <CardHeader>
            <CardTitle>{t("auth.register")}</CardTitle>
            <CardDescription>{t("auth.registerDescription")}</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-secondary-700 mb-2"
                >
                  {t("auth.name")}
                </label>
                <Input
                  id="name"
                  type="text"
                  {...register("name", { required: t("validation.required") })}
                  className={errors.name ? "border-red-500" : ""}
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-secondary-700 mb-2"
                >
                  {t("auth.email")}
                </label>
                <Input
                  id="email"
                  type="email"
                  {...register("email", {
                    required: t("validation.required"),
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: t("validation.email"),
                    },
                  })}
                  className={errors.email ? "border-red-500" : ""}
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-secondary-700 mb-2"
                >
                  {t("auth.password")}
                </label>
                <PasswordInput
                  id="password"
                  {...register("password", {
                    required: t("validation.required"),
                    minLength: {
                      value: 6,
                      message: t("validation.password"),
                    },
                  })}
                  className={errors.password ? "border-red-500" : ""}
                />
                {errors.password && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-secondary-700 mb-2"
                >
                  {t("auth.confirmPassword")}
                </label>
                <PasswordInput
                  id="confirmPassword"
                  {...register("confirmPassword", {
                    required: t("validation.required"),
                    validate: (value) =>
                      value === password || t("validation.passwordMatch"),
                  })}
                  className={errors.confirmPassword ? "border-red-500" : ""}
                />
                {errors.confirmPassword && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="role"
                  className="block text-sm font-medium text-secondary-700 mb-2"
                >
                  {t("auth.role")}
                </label>
                <select
                  id="role"
                  {...register("role", { required: t("validation.required") })}
                  className="input-modern flex h-12 w-full"
                >
                  <option value="candidate">{t("roles.candidate")}</option>
                  <option value="interviewer">{t("roles.interviewer")}</option>
                </select>
                {errors.role && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.role.message}
                  </p>
                )}
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={registerMutation.isPending}
              >
                {registerMutation.isPending
                  ? t("common.loading")
                  : t("auth.register")}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-secondary-700">
                {t("auth.alreadyHaveAccount")}{" "}
                <a
                  href={ROUTES.LOGIN}
                  className="text-primary-600 hover:text-primary-500 font-medium underline"
                >
                  {t("auth.login")}
                </a>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
