import PropTypes from "prop-types";
import { useState } from "react";
import { useTranslation } from "react-i18next";

// Helper function to convert 24h time to 12h format
const formatTimeTo12Hour = (time24) => {
  if (!time24) return "";
  const [hours, minutes] = time24.split(":");
  const hour = parseInt(hours, 10);
  const ampm = hour >= 12 ? "PM" : "AM";
  const hour12 = hour % 12 || 12;
  return `${hour12}:${minutes} ${ampm}`;
};

// Helper function to format date
const formatDate = (dateString, locale) => {
  const date = new Date(dateString);
  const options = { weekday: "short", month: "short", day: "numeric" };
  return date.toLocaleDateString(locale === "ar" ? "ar-EG" : "en-US", options);
};

// Helper function to group slots by date
const groupSlotsByDate = (slots) => {
  const grouped = {};

  slots.forEach((slot) => {
    const dateKey = new Date(slot.date).toDateString();
    if (!grouped[dateKey]) {
      grouped[dateKey] = {
        date: slot.date,
        slots: [],
      };
    }
    grouped[dateKey].slots.push(slot);
  });

  // Sort slots within each day by start time
  Object.values(grouped).forEach((day) => {
    day.slots.sort((a, b) => {
      const timeA = a.startTime.split(":").map(Number);
      const timeB = b.startTime.split(":").map(Number);
      return timeA[0] * 60 + timeA[1] - (timeB[0] * 60 + timeB[1]);
    });
  });

  // Convert to array and sort by date
  return Object.values(grouped).sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );
};

export default function SlotsCalendar({
  slots,
  onBookSlot,
  bookedSlotIds = [],
}) {
  const { t, i18n } = useTranslation();
  const [bookingSlotId, setBookingSlotId] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);

  const handleSlotClick = (slot) => {
    if (slot.status !== "available") return;
    if (bookedSlotIds.includes(slot._id)) return;
    console.log("Slot selected:", slot);
    setSelectedSlot(slot);
  };

  const handleBookNow = async () => {
    if (!selectedSlot) return;

    setBookingSlotId(selectedSlot._id);
    try {
      await onBookSlot(selectedSlot);
      setSelectedSlot(null);
    } finally {
      setBookingSlotId(null);
    }
  };

  if (!slots || slots.length === 0) {
    return (
      <div className="text-center py-12">
        <svg
          className="mx-auto h-12 w-12 text-secondary-400"
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
        <h3 className="mt-2 text-sm font-medium text-secondary-900">
          {t("interviews.noSlotsAvailable")}
        </h3>
      </div>
    );
  }

  const groupedSlots = groupSlotsByDate(slots);

  // Get date range for header
  const firstDate = groupedSlots[0]?.date;
  const lastDate = groupedSlots[groupedSlots.length - 1]?.date;
  const dateRangeText =
    firstDate && lastDate
      ? `${formatDate(firstDate, i18n.language)} - ${formatDate(
          lastDate,
          i18n.language
        )}`
      : "";

  // Get slot class based on status
  const getSlotClass = (slot) => {
    if (bookedSlotIds.includes(slot._id)) {
      return "bg-red-500 text-white cursor-not-allowed font-medium";
    }
    if (slot.status === "booked") {
      return "bg-red-500 text-white cursor-not-allowed font-medium";
    }
    if (slot.status === "pending") {
      return "bg-yellow-400 text-gray-900 cursor-not-allowed font-medium";
    }
    if (selectedSlot?._id === slot._id) {
      return "bg-cyan-600 text-white cursor-pointer hover:bg-cyan-700 shadow-lg font-semibold";
    }
    return "bg-cyan-100 text-cyan-900 hover:bg-cyan-200 cursor-pointer border border-cyan-300 font-medium";
  };

  return (
    <div className="space-y-6">
      {/* Date Range Header */}
      {dateRangeText && (
        <div className="text-center text-sm font-medium text-secondary-600 mb-4">
          {dateRangeText}
        </div>
      )}

      {/* Slots Grid - Days in Columns */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {groupedSlots.map((day, index) => (
          <div
            key={index}
            className="bg-white rounded-lg border border-secondary-200 overflow-hidden shadow-sm"
          >
            {/* Day Header */}
            <div className="bg-cyan-600 px-4 py-3 border-b border-cyan-700">
              <h3 className="text-center font-semibold text-white">
                {formatDate(day.date, i18n.language)}
              </h3>
            </div>

            {/* Slots */}
            <div className="p-3 space-y-2 bg-white">
              {day.slots.map((slot) => (
                <button
                  key={slot._id}
                  onClick={() => handleSlotClick(slot)}
                  disabled={
                    slot.status !== "available" ||
                    bookedSlotIds.includes(slot._id)
                  }
                  className={`w-full px-4 py-2.5 rounded-md text-sm font-medium transition-all ${getSlotClass(
                    slot
                  )}`}
                >
                  {formatTimeTo12Hour(slot.startTime)}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Selected Slot Info & Book Button - Below the grid */}
      {selectedSlot && (
        <div className="bg-cyan-50 rounded-lg border-2 border-cyan-600 p-6 shadow-lg">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-center sm:text-left">
              <h4 className="font-semibold text-lg text-cyan-900 mb-2">
                {t("slots.slotSelected")}
              </h4>
              <p className="text-cyan-800 font-medium">
                📅 {formatDate(selectedSlot.date, i18n.language)}
              </p>
              <p className="text-cyan-800 font-medium">
                ⏰ {formatTimeTo12Hour(selectedSlot.startTime)} -{" "}
                {formatTimeTo12Hour(selectedSlot.endTime)}
              </p>
              {selectedSlot.notes && (
                <p className="text-sm text-cyan-700 mt-1">
                  {selectedSlot.notes}
                </p>
              )}
            </div>
            <button
              onClick={handleBookNow}
              disabled={bookingSlotId === selectedSlot._id}
              className="bg-cyan-600 hover:bg-cyan-700 disabled:bg-gray-400 text-white px-8 py-3 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all disabled:cursor-not-allowed"
            >
              {bookingSlotId === selectedSlot._id
                ? t("common.loading") + "..."
                : t("slots.bookNow")}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

SlotsCalendar.propTypes = {
  slots: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
      startTime: PropTypes.string.isRequired,
      endTime: PropTypes.string.isRequired,
      status: PropTypes.oneOf(["available", "pending", "booked"]).isRequired,
      notes: PropTypes.string,
    })
  ),
  onBookSlot: PropTypes.func.isRequired,
  bookedSlotIds: PropTypes.arrayOf(PropTypes.string),
};
