import {
  Activity,
  AlertTriangle,
  BookOpen,
  CalendarClock,
  ShieldCheck,
  TrendingUp,
  Users,
  Video,
} from "lucide-react";
import { createElement, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { Navigate, useNavigate } from "react-router-dom";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../components/ui/Avatar.jsx";
import { Button } from "../components/ui/Button.jsx";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/Card.jsx";
import PageHeader from "../components/ui/PageHeader.jsx";
import { APP_CONFIG, USER_ROLES } from "../config/app.js";
import {
  useAdminDashboard,
  useApproveInterviewer,
  useRejectInterviewer,
} from "../hooks/api.js";
import { useAuth } from "../hooks/useAuth.js";
import { formatDate, formatDateTime, formatTime } from "../utils/helpers.js";

const statusKeyMap = {
  "in-progress": "status.inProgress",
};

const getInitials = (name = "") =>
  name
    .split(" ")
    .map((part) => part.charAt(0))
    .join("")
    .slice(0, 2)
    .toUpperCase() || "TQ";

const isAbsoluteUrl = (url = "") => /^https?:\/\//i.test(url);

const resolveCvUrl = (url) => {
  if (!url) return null;
  if (isAbsoluteUrl(url)) return url;
  let fallbackOrigin = window.location.origin;
  try {
    fallbackOrigin = new URL(APP_CONFIG.apiBaseUrl).origin;
  } catch {
    // ignore, fallback to current origin
  }
  const normalizedPath = url.startsWith("/") ? url : `/${url}`;
  return `${fallbackOrigin}${normalizedPath}`;
};

const calculateTrendChange = (series = []) => {
  if (!series.length) return 0;
  const first = series[0];
  const last = series[series.length - 1];
  if (first === 0) {
    return last === 0 ? 0 : 100;
  }
  return ((last - first) / (first || 1)) * 100;
};

const Sparkline = ({ data = [], stroke = "#0891b2" }) => {
  if (!data.length || data.every((value) => value === 0)) {
    return (
      <div className="flex h-20 items-center justify-center text-xs text-secondary-400">
        —
      </div>
    );
  }

  const maxValue = Math.max(...data, 1);
  const points = data
    .map((value, index) => {
      const x = (index / Math.max(data.length - 1, 1)) * 100;
      const y = 40 - (value / maxValue) * 40;
      return `${x},${y}`;
    })
    .join(" ");

  const lastY = 40 - (data[data.length - 1] / maxValue) * 40;
  const lastX = 100;

  return (
    <svg
      viewBox="0 0 100 40"
      preserveAspectRatio="none"
      className="h-20 w-full overflow-visible"
    >
      <polyline
        fill="none"
        stroke={stroke}
        strokeWidth="2"
        strokeLinecap="round"
        points={points}
      />
      <circle cx={lastX} cy={lastY} r="2.5" fill={stroke} />
    </svg>
  );
};

const StatCard = ({ title, value, subtitle, icon, accent, footnote }) => (
  <div className="relative overflow-hidden rounded-2xl border border-secondary-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
    <div className="flex items-center justify-between gap-3">
      <div>
        <p className="text-sm font-medium text-secondary-500">{title}</p>
        <p className="text-2xl font-semibold text-secondary-900">{value}</p>
        {subtitle && (
          <p className="mt-1 text-xs text-secondary-500">{subtitle}</p>
        )}
      </div>
      <div
        className={`flex h-12 w-12 items-center justify-center rounded-xl text-white ${accent}`}
      >
        {icon ? createElement(icon, { className: "h-6 w-6" }) : null}
      </div>
    </div>
    {footnote && (
      <p className="mt-4 text-xs font-medium text-secondary-400">{footnote}</p>
    )}
  </div>
);

const TrendCard = ({
  title,
  value,
  series,
  stroke,
  changeLabel,
  footnote,
  icon,
}) => {
  const change = calculateTrendChange(series);
  const isPositive = change >= 0;

  return (
    <Card className="h-full border border-secondary-200 shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div>
          <CardTitle className="text-base font-medium text-secondary-900">
            {title}
          </CardTitle>
          <p className="text-sm text-secondary-500">{changeLabel}</p>
        </div>
        <div className="rounded-xl bg-secondary-50 p-3 text-secondary-600">
          {icon ? createElement(icon, { className: "h-5 w-5" }) : null}
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-3xl font-semibold text-secondary-900">{value}</p>
        <div className="flex items-center gap-2 text-sm font-medium">
          <span
            className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs ${
              isPositive
                ? "bg-emerald-50 text-emerald-600"
                : "bg-rose-50 text-rose-600"
            }`}
          >
            {isPositive ? "+" : ""}
            {Number.isFinite(change) ? change.toFixed(1) : "0"}%
          </span>
          <span className="text-secondary-500">/</span>
          <span className="text-secondary-600">{changeLabel}</span>
        </div>
        <Sparkline data={series} stroke={stroke} />
        {footnote && <p className="text-xs text-secondary-400">{footnote}</p>}
      </CardContent>
    </Card>
  );
};

const StatusBadge = ({ status, label }) => {
  const statusStyles = {
    pending: "bg-amber-50 text-amber-700 border-amber-200",
    accepted: "bg-emerald-50 text-emerald-700 border-emerald-200",
    rejected: "bg-rose-50 text-rose-700 border-rose-200",
    scheduled: "bg-blue-50 text-blue-700 border-blue-200",
    "in-progress": "bg-cyan-50 text-cyan-700 border-cyan-200",
    completed: "bg-slate-100 text-slate-700 border-slate-200",
    cancelled: "bg-gray-100 text-gray-600 border-gray-200",
  };

  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${
        statusStyles[status] || "bg-secondary-100 text-secondary-700"
      }`}
    >
      {label}
    </span>
  );
};

export default function AdminPage() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  const { data, isLoading, isError, error } = useAdminDashboard();
  const approveInterviewer = useApproveInterviewer();
  const rejectInterviewer = useRejectInterviewer();
  const [actioning, setActioning] = useState(null);

  const isRTL = i18n.language === "ar";
  const locale = i18n.language === "ar" ? "ar-EG" : "en-US";

  const numberFormatter = useMemo(
    () => new Intl.NumberFormat(locale),
    [locale]
  );

  const stats = data?.stats || {};
  const trends = data?.trends || { labels: [], users: [], reservations: [] };
  const pendingInterviewers = data?.pendingInterviewers || [];
  const recent = data?.recent || {
    users: [],
    reservations: [],
    sessions: [],
  };
  const system = data?.system;

  const formatNumber = (value = 0) => numberFormatter.format(value);

  const uptimeLabel = (() => {
    if (!system?.uptimeSeconds && system?.uptimeSeconds !== 0) return "--";
    const hours = Math.floor(system.uptimeSeconds / 3600);
    const minutes = Math.floor((system.uptimeSeconds % 3600) / 60);
    return t("admin.system.uptimeValue", { hours, minutes });
  })();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (user?.role !== USER_ROLES.ADMIN) {
    return <Navigate to="/dashboard" replace />;
  }

  const statCards = [
    {
      key: "users",
      title: t("admin.stats.totalUsers"),
      value: formatNumber(stats.users?.total || 0),
      subtitle: t("admin.stats.activeUsers", {
        count: formatNumber(stats.users?.active || 0),
      }),
      footnote: `${formatNumber(stats.users?.pendingInterviewers || 0)} ${t(
        "admin.stats.pendingInterviewers"
      )}`,
      icon: Users,
      accent: "bg-gradient-to-br from-cyan-500 to-blue-600",
    },
    {
      key: "reservations",
      title: t("admin.stats.reservations"),
      value: formatNumber(stats.reservations?.total || 0),
      subtitle: t("admin.stats.pendingReservations", {
        count: formatNumber(stats.reservations?.pending || 0),
      }),
      footnote: `${t("status.accepted")}: ${formatNumber(
        stats.reservations?.accepted || 0
      )} / ${t("status.rejected")}: ${formatNumber(
        stats.reservations?.rejected || 0
      )}`,
      icon: CalendarClock,
      accent: "bg-gradient-to-br from-emerald-500 to-lime-500",
    },
    {
      key: "sessions",
      title: t("admin.stats.sessions"),
      value: formatNumber(stats.sessions?.total || 0),
      subtitle: t("admin.stats.upcomingSessions", {
        count: formatNumber(stats.sessions?.upcoming || 0),
      }),
      footnote: `${t("status.completed")}: ${formatNumber(
        stats.sessions?.completed || 0
      )}`,
      icon: Video,
      accent: "bg-gradient-to-br from-fuchsia-500 to-purple-500",
    },
    {
      key: "content",
      title: t("admin.stats.content"),
      value: formatNumber(stats.content?.total || 0),
      subtitle: t("admin.stats.publishedContent", {
        count: formatNumber(stats.content?.published || 0),
      }),
      footnote: `${t("admin.stats.slots", {
        defaultValue: "Slots",
      })}: ${formatNumber(stats.slots?.total || 0)}`,
      icon: BookOpen,
      accent: "bg-gradient-to-br from-amber-500 to-orange-500",
    },
    {
      key: "evaluations",
      title: t("admin.stats.evaluations"),
      value: stats.evaluations?.averageScore
        ? stats.evaluations.averageScore.toFixed(1)
        : "0.0",
      subtitle: t("admin.stats.avgScore"),
      footnote: `${formatNumber(stats.evaluations?.total || 0)} ${t(
        "admin.stats.records",
        { defaultValue: "records" }
      )}`,
      icon: ShieldCheck,
      accent: "bg-gradient-to-br from-slate-500 to-gray-600",
    },
  ];

  const handleApprove = async (id) => {
    setActioning({ id, type: "approve" });
    try {
      await approveInterviewer.mutateAsync(id);
      toast.success(t("admin.approveSuccess"));
    } catch (mutationError) {
      toast.error(mutationError.response?.data?.message || t("common.error"));
    } finally {
      setActioning(null);
    }
  };

  const handleReject = async (id) => {
    setActioning({ id, type: "reject" });
    try {
      await rejectInterviewer.mutateAsync(id);
      toast.success(t("admin.rejectSuccess"));
    } catch (mutationError) {
      toast.error(mutationError.response?.data?.message || t("common.error"));
    } finally {
      setActioning(null);
    }
  };

  const renderPendingInterviewers = () => {
    if (!pendingInterviewers.length) {
      return (
        <div className="rounded-2xl border border-dashed border-emerald-200 bg-emerald-50/60 p-6 text-center text-sm font-medium text-emerald-700">
          {t("admin.pendingSection.empty")}
        </div>
      );
    }

    return (
      <div className="space-y-4">
        {pendingInterviewers.map((candidate) => {
          const specializationLabel = candidate.specialization
            ? t(`specializations.${candidate.specialization}`, {
                defaultValue: candidate.specialization,
              })
            : "";
          const yearsOfExperience = candidate.yearsOfExperience ?? 0;
          const cvHref = resolveCvUrl(candidate.cvUrl);
          const isApproveLoading =
            actioning?.id === candidate.id && actioning?.type === "approve";
          const isRejectLoading =
            actioning?.id === candidate.id && actioning?.type === "reject";

          return (
            <div
              key={candidate.id}
              className="flex flex-col gap-4 rounded-2xl border border-secondary-200 p-4 shadow-sm transition hover:border-primary-200 md:flex-row md:items-center md:justify-between"
            >
              <div className="flex items-center gap-3">
                <Avatar className="h-12 w-12">
                  {candidate.avatarUrl ? (
                    <AvatarImage
                      src={candidate.avatarUrl}
                      alt={candidate.name}
                    />
                  ) : (
                    <AvatarFallback>
                      {getInitials(candidate.name)}
                    </AvatarFallback>
                  )}
                </Avatar>
                <div>
                  <p className="text-sm font-semibold text-secondary-900">
                    {candidate.name}
                  </p>
                  <p className="text-xs text-secondary-500">
                    {candidate.email}
                  </p>
                  <p className="text-xs text-secondary-500">
                    {specializationLabel} · {yearsOfExperience}{" "}
                    {t("common.years")}
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                {cvHref && (
                  <a
                    href={cvHref}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs font-medium text-cyan-600 underline-offset-4 hover:underline"
                  >
                    {t("admin.pendingSection.cv")}
                  </a>
                )}
                <Button
                  variant="success"
                  size="sm"
                  onClick={() => handleApprove(candidate.id)}
                  disabled={isApproveLoading}
                >
                  {isApproveLoading
                    ? t("common.loading")
                    : t("admin.actions.approve")}
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleReject(candidate.id)}
                  disabled={isRejectLoading}
                >
                  {isRejectLoading
                    ? t("common.loading")
                    : t("admin.actions.reject")}
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  const renderRecentList = (items, emptyLabel, renderItem) => {
    if (!items.length) {
      return typeof emptyLabel === "string" ? (
        <p className="text-sm text-secondary-500">{emptyLabel}</p>
      ) : (
        emptyLabel
      );
    }
    return <div className="space-y-4">{items.map(renderItem)}</div>;
  };

  if (isLoading) {
    return (
      <div className={`min-h-screen bg-animated py-8 ${isRTL ? "rtl" : "ltr"}`}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">
          <PageHeader
            title={t("admin.dashboardTitle")}
            subtitle={t("admin.subtitle")}
          />
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
            {Array.from({ length: 4 }).map((_, idx) => (
              <div
                key={idx}
                className="h-32 rounded-2xl bg-white/70 shadow-sm animate-pulse"
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
        <div className="max-w-md rounded-2xl border border-red-100 bg-white p-6 text-center shadow-sm">
          <AlertTriangle className="mx-auto h-10 w-10 text-red-500" />
          <p className="mt-4 text-base font-semibold text-secondary-900">
            {t("errors.serverError")}
          </p>
          <p className="mt-2 text-sm text-secondary-500">
            {error?.message || t("common.error")}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-animated py-8 ${isRTL ? "rtl" : "ltr"}`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">
        <PageHeader
          title={t("admin.dashboardTitle")}
          subtitle={t("admin.subtitle")}
        />

        <section className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-5">
          {statCards.map((card) => {
            const { key, ...cardProps } = card;
            return <StatCard key={key} {...cardProps} />;
          })}
        </section>

        <section className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <TrendCard
                title={t("admin.trends.users")}
                value={formatNumber(
                  (trends.users || []).reduce((sum, value) => sum + value, 0)
                )}
                series={trends.users || []}
                stroke="#0891b2"
                changeLabel={t("admin.trends.vsLastWeek")}
                footnote={t("admin.trends.lastDays", {
                  count: trends.labels?.length || 0,
                })}
                icon={TrendingUp}
              />
              <TrendCard
                title={t("admin.trends.reservations")}
                value={formatNumber(
                  (trends.reservations || []).reduce(
                    (sum, value) => sum + value,
                    0
                  )
                )}
                series={trends.reservations || []}
                stroke="#a855f7"
                changeLabel={t("admin.trends.vsLastWeek")}
                footnote={t("admin.trends.lastDays", {
                  count: trends.labels?.length || 0,
                })}
                icon={Activity}
              />
            </div>

            <Card className="border border-secondary-200 shadow-sm">
              <CardHeader>
                <CardTitle>{t("admin.pendingSection.title")}</CardTitle>
                <CardDescription>
                  {t("admin.pendingSection.description")}
                </CardDescription>
              </CardHeader>
              <CardContent>{renderPendingInterviewers()}</CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="border border-secondary-200 shadow-sm">
              <CardHeader>
                <CardTitle>{t("admin.system.title")}</CardTitle>
                <CardDescription>
                  {t("admin.quickActionsDescription")}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 text-sm text-secondary-600">
                <div className="rounded-2xl border border-secondary-200 bg-secondary-50/60 p-4">
                  <p className="text-xs uppercase tracking-wide text-secondary-500">
                    {t("admin.system.uptime")}
                  </p>
                  <p className="text-lg font-semibold text-secondary-900">
                    {uptimeLabel}
                  </p>
                  {system?.lastUpdated && (
                    <p className="text-xs text-secondary-500">
                      {t("admin.system.lastUpdated")}:{" "}
                      {formatDateTime(system.lastUpdated, locale)}
                    </p>
                  )}
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-secondary-500">
                    {t("admin.system.quickActions")}
                  </p>
                  <div className="mt-3 grid gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => navigate("/dashboard")}
                    >
                      {t("admin.system.users")}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => navigate("/interviews")}
                    >
                      {t("admin.system.interviews")}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => navigate("/learning")}
                    >
                      {t("admin.system.learning")}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <Card className="border border-secondary-200 shadow-sm">
            <CardHeader>
              <CardTitle>{t("admin.recentActivity.title")}</CardTitle>
              <CardDescription>
                {t("admin.recentActivity.subtitle", {
                  defaultValue: t("admin.overview", { defaultValue: "" }),
                })}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <div className="mb-3 flex items-center justify-between">
                  <p className="text-sm font-semibold text-secondary-900">
                    {t("admin.recentActivity.newUsers")}
                  </p>
                  <span className="text-xs text-secondary-500">
                    {formatNumber(recent.users?.length || 0)}
                  </span>
                </div>
                {renderRecentList(
                  recent.users || [],
                  t("admin.recentActivity.empty"),
                  (item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between gap-3"
                    >
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          {item.avatarUrl ? (
                            <AvatarImage src={item.avatarUrl} alt={item.name} />
                          ) : (
                            <AvatarFallback>
                              {getInitials(item.name)}
                            </AvatarFallback>
                          )}
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium text-secondary-900">
                            {item.name}
                          </p>
                          <p className="text-xs text-secondary-500">
                            {t(`roles.${item.role}`, {
                              defaultValue: item.role,
                            })}
                          </p>
                        </div>
                      </div>
                      <span className="text-xs text-secondary-400">
                        {formatDate(item.createdAt, locale)}
                      </span>
                    </div>
                  )
                )}
              </div>

              <div className="border-t border-dashed border-secondary-200 pt-4">
                <div className="mb-3 flex items-center justify-between">
                  <p className="text-sm font-semibold text-secondary-900">
                    {t("admin.recentActivity.reservations")}
                  </p>
                  <span className="text-xs text-secondary-500">
                    {formatNumber(recent.reservations?.length || 0)}
                  </span>
                </div>
                {renderRecentList(
                  recent.reservations || [],
                  t("admin.recentActivity.empty"),
                  (reservation) => {
                    const statusKey =
                      statusKeyMap[reservation.status] ||
                      `status.${reservation.status}`;
                    return (
                      <div
                        key={reservation.id}
                        className="flex flex-col gap-2 rounded-2xl border border-secondary-100 bg-secondary-50/40 p-3 text-sm text-secondary-700"
                      >
                        <div className="flex items-center justify-between">
                          <p className="font-semibold text-secondary-900">
                            {reservation.candidate?.name} →{" "}
                            {reservation.interviewer?.name}
                          </p>
                          <StatusBadge
                            status={reservation.status}
                            label={t(statusKey, {
                              defaultValue: reservation.status,
                            })}
                          />
                        </div>
                        {reservation.slot && (
                          <p className="text-xs text-secondary-500">
                            {formatDate(reservation.slot.date, locale)} ·{" "}
                            {formatTime(reservation.slot.startTime)} -{" "}
                            {formatTime(reservation.slot.endTime)}
                          </p>
                        )}
                      </div>
                    );
                  }
                )}
              </div>
            </CardContent>
          </Card>

          <Card className="border border-secondary-200 shadow-sm">
            <CardHeader>
              <CardTitle>{t("admin.recentActivity.sessions")}</CardTitle>
              <CardDescription>
                {t("admin.recentActivity.description", {
                  defaultValue: t("admin.overview", { defaultValue: "" }),
                })}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {renderRecentList(
                recent.sessions || [],
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <CalendarClock className="h-12 w-12 text-secondary-300 mb-3" />
                  <p className="text-sm font-medium text-secondary-500">
                    {t("admin.recentActivity.empty")}
                  </p>
                </div>,
                (session) => {
                  const labelKey =
                    statusKeyMap[session.status] || `status.${session.status}`;
                  return (
                    <div
                      key={session.id}
                      className="flex flex-col gap-3 rounded-2xl border border-secondary-100 p-4"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-semibold text-secondary-900">
                            {session.candidate?.name}
                          </p>
                          <p className="text-xs text-secondary-500">
                            {session.interviewer?.name}
                          </p>
                        </div>
                        <StatusBadge
                          status={session.status}
                          label={t(labelKey, {
                            defaultValue: session.status,
                          })}
                        />
                      </div>
                      <div className="flex items-center gap-2 text-xs text-secondary-500">
                        <CalendarClock className="h-4 w-4 text-cyan-600" />
                        <span>
                          {formatDate(session.date, locale)} ·{" "}
                          {formatTime(session.startTime)} -{" "}
                          {formatTime(session.endTime)}
                        </span>
                      </div>
                    </div>
                  );
                }
              )}
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}
