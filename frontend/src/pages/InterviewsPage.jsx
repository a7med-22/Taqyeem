import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Navigate } from "react-router-dom";
import DayCalendar from "../components/interviews/DayCalendar.jsx";
import InterviewerList from "../components/interviews/InterviewerList.jsx";
import ReservationsList from "../components/interviews/ReservationsList.jsx";
import ScheduleForm from "../components/interviews/ScheduleForm.jsx";
import SlotsList from "../components/interviews/SlotsList.jsx";
import { Button } from "../components/ui/Button.jsx";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/Card.jsx";
import PageHeader from "../components/ui/PageHeader.jsx";
import {
  useAcceptReservation,
  useCreateReservation,
  useDays,
  useInterviewers,
  useMyReservations,
  useMySchedules,
  usePendingReservations,
  useRejectReservation,
  useSlotsByDay,
} from "../hooks/api.js";
import { useAuth } from "../hooks/useAuth.js";

export default function InterviewsPage() {
  const { t, i18n } = useTranslation();
  const { isAuthenticated, user } = useAuth();
  const isRTL = i18n.language === "ar";

  const [selectedInterviewer, setSelectedInterviewer] = useState(null);
  const [selectedDay, setSelectedDay] = useState(null);
  const [showScheduleForm, setShowScheduleForm] = useState(false);

  // Fetch data based on user role
  const { data: interviewersData } = useInterviewers();
  const { data: daysData } = useDays();
  const { data: myReservations } = useMyReservations();
  const {
    data: mySchedules,
    isLoading: schedulesLoading,
    error: schedulesError,
  } = useMySchedules();
  const { data: pendingReservations } = usePendingReservations(
    user?.role === "interviewer"
  );

  // Debug logging
  console.log("InterviewsPage - User role:", user?.role);
  console.log("InterviewsPage - mySchedules data:", mySchedules);
  console.log("InterviewsPage - schedulesLoading:", schedulesLoading);
  console.log("InterviewsPage - schedulesError:", schedulesError);

  const { data: slots } = useSlotsByDay(
    selectedDay?._id,
    selectedInterviewer ? { interviewerId: selectedInterviewer._id } : {}
  );

  const createReservation = useCreateReservation();
  const acceptReservation = useAcceptReservation();
  const rejectReservation = useRejectReservation();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const isInterviewer = user?.role === "interviewer";
  const isCandidate = user?.role === "candidate";

  const handleSelectInterviewer = (interviewer) => {
    setSelectedInterviewer(interviewer);
    setSelectedDay(null);
  };

  const handleSelectDay = (day) => {
    setSelectedDay(day);
  };

  const handleBookSlot = async (slot) => {
    if (!selectedDay) return;

    try {
      await createReservation.mutateAsync({
        slotId: slot._id,
        note: "",
      });
      alert(t("reservations.bookingSuccess"));
    } catch (error) {
      alert(error.response?.data?.message || t("common.error"));
    }
  };

  const handleAcceptReservation = async (id) => {
    try {
      await acceptReservation.mutateAsync(id);
      alert(t("reservations.acceptSuccess"));
    } catch (error) {
      alert(error.response?.data?.message || t("common.error"));
    }
  };

  const handleRejectReservation = async (id) => {
    const reason = prompt(t("reservations.rejectionReasonPrompt"));
    if (!reason) return;

    try {
      await rejectReservation.mutateAsync({
        id,
        data: { rejectionReason: reason },
      });
      alert(t("reservations.rejectSuccess"));
    } catch (error) {
      alert(error.response?.data?.message || t("common.error"));
    }
  };

  const bookedSlotIds =
    myReservations
      ?.filter((r) => r.status === "pending")
      .map((r) => r.slotId?._id) || [];

  return (
    <div className={`min-h-screen bg-animated py-8 ${isRTL ? "rtl" : "ltr"}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <PageHeader
          title={t("navigation.interviews")}
          subtitle={
            isInterviewer
              ? t("interviews.interviewerSubtitle")
              : t("interviews.candidateSubtitle")
          }
        />

        {/* CANDIDATE VIEW */}
        {isCandidate && (
          <div className="space-y-8">
            {/* My Reservations */}
            <Card className="card-modern">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
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
                  {t("interviews.myReservations")}
                </CardTitle>
                <CardDescription>
                  {t("interviews.myReservationsDescription")}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ReservationsList
                  reservations={myReservations}
                  isInterviewer={false}
                />
              </CardContent>
            </Card>

            {/* Browse Interviewers */}
            {!selectedInterviewer && (
              <Card className="card-modern">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <svg
                      className="w-5 h-5 text-secondary-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                    {t("interviews.browseInterviewers")}
                  </CardTitle>
                  <CardDescription>
                    {t("interviews.browseInterviewersDescription")}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <InterviewerList
                    interviewers={interviewersData?.interviewers}
                    onSelectInterviewer={handleSelectInterviewer}
                  />
                </CardContent>
              </Card>
            )}

            {/* Selected Interviewer - Choose Day & Book Slots */}
            {selectedInterviewer && (
              <Card className="card-modern">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        {selectedInterviewer.name}
                      </CardTitle>
                      <CardDescription>
                        {t("interviews.selectDayAndSlot")}
                      </CardDescription>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setSelectedInterviewer(null);
                        setSelectedDay(null);
                      }}
                    >
                      {t("common.back")}
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Day Selection */}
                  <div>
                    <h3 className="text-sm font-medium text-secondary-700 mb-3">
                      {t("interviews.selectDay")}
                    </h3>
                    <div className="p-4 bg-secondary-50 rounded-lg border border-secondary-200">
                      <DayCalendar
                        days={daysData?.days}
                        selectedDayId={selectedDay?._id}
                        onSelectDay={handleSelectDay}
                      />
                    </div>
                  </div>

                  {/* Slots */}
                  {selectedDay && (
                    <div>
                      <h3 className="text-sm font-medium text-secondary-700 mb-3">
                        {t("interviews.availableSlots")}
                      </h3>
                      <SlotsList
                        slots={slots}
                        onBookSlot={handleBookSlot}
                        bookedSlotIds={bookedSlotIds}
                      />
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </div>
        )}

        {/* INTERVIEWER VIEW */}
        {isInterviewer && (
          <div className="space-y-8">
            {/* Pending Reservations */}
            <Card className="card-modern">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <svg
                    className="w-5 h-5 text-yellow-600"
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
                  {t("interviews.pendingReservations")}
                </CardTitle>
                <CardDescription>
                  {t("interviews.pendingReservationsDescription")}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ReservationsList
                  reservations={pendingReservations}
                  onAccept={handleAcceptReservation}
                  onReject={handleRejectReservation}
                  isInterviewer={true}
                />
              </CardContent>
            </Card>

            {/* My Schedules */}
            <Card className="card-modern">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
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
                      {t("interviews.mySchedules")}
                    </CardTitle>
                    <CardDescription>
                      {t("interviews.mySchedulesDescription")}
                    </CardDescription>
                  </div>
                  <Button
                    variant="default"
                    size="sm"
                    onClick={() => setShowScheduleForm(!showScheduleForm)}
                  >
                    {showScheduleForm
                      ? t("common.cancel")
                      : t("schedules.createSchedule")}
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {showScheduleForm && (
                  <div className="mb-6">
                    <ScheduleForm
                      onSuccess={() => setShowScheduleForm(false)}
                      onCancel={() => setShowScheduleForm(false)}
                    />
                  </div>
                )}

                {schedulesLoading ? (
                  <div className="text-center py-8">
                    <p className="text-sm text-secondary-600">
                      {t("common.loading")}
                    </p>
                  </div>
                ) : schedulesError ? (
                  <div className="text-center py-8">
                    <p className="text-sm text-red-600">
                      Error loading schedules
                    </p>
                  </div>
                ) : mySchedules && mySchedules.length > 0 ? (
                  <div className="space-y-4">
                    {mySchedules.map((schedule) => (
                      <div
                        key={schedule._id}
                        className="p-4 border border-secondary-200 rounded-lg hover:border-primary-300 transition-all"
                      >
                        <div className="flex items-start justify-between">
                          <div>
                            <h4 className="font-semibold text-secondary-900">
                              {schedule.title}
                            </h4>
                            <p className="text-sm text-secondary-600 mt-1">
                              {schedule.description}
                            </p>
                            <div className="flex items-center gap-4 mt-2 text-sm text-secondary-500">
                              <span>
                                {schedule.startTime} - {schedule.endTime}
                              </span>
                              <span>•</span>
                              <span>
                                {schedule.duration} {t("common.minutes")}
                              </span>
                              <span>•</span>
                              <span>
                                {t("schedules.break")}: {schedule.breakTime}{" "}
                                {t("common.minutes")}
                              </span>
                            </div>
                          </div>
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium ${
                              schedule.isActive
                                ? "bg-green-100 text-green-800"
                                : "bg-secondary-100 text-secondary-800"
                            }`}
                          >
                            {schedule.isActive
                              ? t("common.active")
                              : t("common.inactive")}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-secondary-600 text-center py-8">
                    {t("schedules.noSchedules")}
                  </p>
                )}
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
