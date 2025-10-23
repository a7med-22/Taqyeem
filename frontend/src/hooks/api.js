import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  authAPI,
  daysAPI,
  evaluationsAPI,
  learningAPI,
  reservationsAPI,
  sessionsAPI,
  slotsAPI,
  usersAPI,
} from "../api";

// Auth hooks
export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authAPI.login,
    onSuccess: (data) => {
      // Don't store in localStorage here - let AuthContext handle it
      queryClient.setQueryData(["user"], data.data.user);
    },
  });
};

export const useRegister = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authAPI.register,
    onSuccess: (data) => {
      // Don't store in localStorage here - let AuthContext handle it
      queryClient.setQueryData(["user"], data.data.user);
    },
  });
};

export const useGetMe = () => {
  return useQuery({
    queryKey: ["user"],
    queryFn: authAPI.getMe,
    select: (data) => data.data.user,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: false, // Don't retry if backend is not available
    enabled: !!localStorage.getItem("token"), // Only run if there's a token
  });
};

// Users hooks
export const useUsers = (params) => {
  return useQuery({
    queryKey: ["users", params],
    queryFn: () => usersAPI.getUsers(params),
    select: (data) => data.data,
  });
};

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: usersAPI.updateProfile,
    onSuccess: () => {
      queryClient.invalidateQueries(["user"]);
    },
  });
};

// Days hooks
export const useDays = (params) => {
  return useQuery({
    queryKey: ["days", params],
    queryFn: () => daysAPI.getDays(params),
    select: (data) => data.data,
  });
};

export const useDay = (id) => {
  return useQuery({
    queryKey: ["day", id],
    queryFn: () => daysAPI.getDayById(id),
    select: (data) => data.data.day,
    enabled: !!id,
  });
};

export const useCreateDay = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: daysAPI.createDay,
    onSuccess: () => {
      queryClient.invalidateQueries(["days"]);
    },
  });
};

// Slots hooks
export const useSlotsByDay = (dayId, params) => {
  return useQuery({
    queryKey: ["slots", dayId, params],
    queryFn: () => slotsAPI.getSlotsByDay(dayId, params),
    select: (data) => data.data.slots,
    enabled: !!dayId,
  });
};

export const useMySlots = (params) => {
  return useQuery({
    queryKey: ["my-slots", params],
    queryFn: () => slotsAPI.getMySlots(params),
    select: (data) => data.data.slots,
  });
};

export const useCreateSlot = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: slotsAPI.createSlot,
    onSuccess: () => {
      queryClient.invalidateQueries(["slots"]);
      queryClient.invalidateQueries(["my-slots"]);
    },
  });
};

// Reservations hooks
export const useMyReservations = (params) => {
  return useQuery({
    queryKey: ["my-reservations", params],
    queryFn: () => reservationsAPI.getMyReservations(params),
    select: (data) => data.data.reservations,
  });
};

export const usePendingReservations = () => {
  return useQuery({
    queryKey: ["pending-reservations"],
    queryFn: reservationsAPI.getPendingReservations,
    select: (data) => data.data.reservations,
  });
};

export const useCreateReservation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: reservationsAPI.createReservation,
    onSuccess: () => {
      queryClient.invalidateQueries(["my-reservations"]);
      queryClient.invalidateQueries(["slots"]);
    },
  });
};

export const useAcceptReservation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: reservationsAPI.acceptReservation,
    onSuccess: () => {
      queryClient.invalidateQueries(["pending-reservations"]);
      queryClient.invalidateQueries(["my-reservations"]);
      queryClient.invalidateQueries(["sessions"]);
    },
  });
};

export const useRejectReservation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }) => reservationsAPI.rejectReservation(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries(["pending-reservations"]);
      queryClient.invalidateQueries(["my-reservations"]);
    },
  });
};

// Sessions hooks
export const useMySessions = (params) => {
  return useQuery({
    queryKey: ["my-sessions", params],
    queryFn: () => sessionsAPI.getMySessions(params),
    select: (data) => data.data.sessions,
  });
};

export const useSession = (id) => {
  return useQuery({
    queryKey: ["session", id],
    queryFn: () => sessionsAPI.getSessionById(id),
    select: (data) => data.data.session,
    enabled: !!id,
  });
};

export const useStartSession = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: sessionsAPI.startSession,
    onSuccess: (_, sessionId) => {
      queryClient.invalidateQueries(["session", sessionId]);
      queryClient.invalidateQueries(["my-sessions"]);
    },
  });
};

export const useCompleteSession = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }) => sessionsAPI.completeSession(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries(["session", id]);
      queryClient.invalidateQueries(["my-sessions"]);
    },
  });
};

// Evaluations hooks
export const useEvaluationBySession = (sessionId) => {
  return useQuery({
    queryKey: ["evaluation", sessionId],
    queryFn: () => evaluationsAPI.getEvaluationBySession(sessionId),
    select: (data) => data.data.evaluation,
    enabled: !!sessionId,
  });
};

export const useMyEvaluations = (params) => {
  return useQuery({
    queryKey: ["my-evaluations", params],
    queryFn: () => evaluationsAPI.getMyEvaluations(params),
    select: (data) => data.data,
  });
};

export const useCreateEvaluation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: evaluationsAPI.createEvaluation,
    onSuccess: (_, data) => {
      queryClient.invalidateQueries(["evaluation", data.sessionId]);
      queryClient.invalidateQueries(["my-evaluations"]);
    },
  });
};

// Learning hooks
export const useLearningContent = (params) => {
  return useQuery({
    queryKey: ["learning-content", params],
    queryFn: () => learningAPI.getContent(params),
    select: (data) => data.data,
  });
};

export const useLearningContentById = (id) => {
  return useQuery({
    queryKey: ["learning-content", id],
    queryFn: () => learningAPI.getContentById(id),
    select: (data) => data.data.content,
    enabled: !!id,
  });
};

export const useLearningCategories = () => {
  return useQuery({
    queryKey: ["learning-categories"],
    queryFn: learningAPI.getCategories,
    select: (data) => data.data.categories,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};
