import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { Button } from "../ui/Button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/Card";

export default function ReservationCard({
  reservation,
  onAccept,
  onReject,
  isInterviewer,
}) {
  const { t } = useTranslation();

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "accepted":
        return "bg-green-100 text-green-800 border-green-200";
      case "rejected":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-secondary-100 text-secondary-800 border-secondary-200";
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "pending":
        return t("reservations.pending");
      case "accepted":
        return t("reservations.accepted");
      case "rejected":
        return t("reservations.rejected");
      default:
        return status;
    }
  };

  const user = isInterviewer
    ? reservation.candidateId
    : reservation.interviewerId;
  const slot = reservation.slotId;

  return (
    <Card className="card-modern">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            {user?.avatarUrl ? (
              <img
                src={user.avatarUrl}
                alt={user.name}
                className="w-12 h-12 rounded-full object-cover"
              />
            ) : (
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center text-white font-semibold">
                {user?.name?.charAt(0).toUpperCase()}
              </div>
            )}
            <div>
              <CardTitle className="text-base">{user?.name}</CardTitle>
              <CardDescription className="text-sm">
                {user?.email}
              </CardDescription>
            </div>
          </div>
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(
              reservation.status
            )}`}
          >
            {getStatusText(reservation.status)}
          </span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm text-secondary-700">
            <svg
              className="w-4 h-4 text-primary-500"
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
            <span className="font-medium">
              {slot?.startTime} - {slot?.endTime}
            </span>
          </div>

          {reservation.note && (
            <div className="p-3 bg-secondary-50 rounded-lg">
              <p className="text-sm text-secondary-700">
                <span className="font-medium">{t("reservations.note")}:</span>{" "}
                {reservation.note}
              </p>
            </div>
          )}

          {reservation.status === "rejected" && reservation.rejectionReason && (
            <div className="p-3 bg-red-50 rounded-lg border border-red-200">
              <p className="text-sm text-red-700">
                <span className="font-medium">
                  {t("reservations.rejectionReason")}:
                </span>{" "}
                {reservation.rejectionReason}
              </p>
            </div>
          )}

          {isInterviewer && reservation.status === "pending" && (
            <div className="flex gap-2 pt-2">
              <Button
                variant="default"
                size="sm"
                className="flex-1"
                onClick={() => onAccept(reservation._id)}
              >
                {t("reservations.accept")}
              </Button>
              <Button
                variant="destructive"
                size="sm"
                className="flex-1"
                onClick={() => onReject(reservation._id)}
              >
                {t("reservations.reject")}
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

ReservationCard.propTypes = {
  reservation: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    note: PropTypes.string,
    rejectionReason: PropTypes.string,
    candidateId: PropTypes.shape({
      name: PropTypes.string,
      email: PropTypes.string,
      avatarUrl: PropTypes.string,
    }),
    interviewerId: PropTypes.shape({
      name: PropTypes.string,
      email: PropTypes.string,
      avatarUrl: PropTypes.string,
    }),
    slotId: PropTypes.shape({
      startTime: PropTypes.string,
      endTime: PropTypes.string,
    }),
  }).isRequired,
  onAccept: PropTypes.func,
  onReject: PropTypes.func,
  isInterviewer: PropTypes.bool,
};
