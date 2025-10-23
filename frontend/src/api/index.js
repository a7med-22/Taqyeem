import api from '../config/api.js';

// Auth API
export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/register', userData),
  getMe: () => api.get('/auth/me'),
};

// Users API
export const usersAPI = {
  getUsers: (params) => api.get('/users', { params }),
  getUserById: (id) => api.get(`/users/${id}`),
  updateProfile: (data) => api.put('/users/me', data),
  updateAvatar: (formData) => api.put('/users/me/avatar', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  deactivateAccount: () => api.put('/users/me/deactivate'),
};

// Days API
export const daysAPI = {
  getDays: (params) => api.get('/days', { params }),
  getDayById: (id) => api.get(`/days/${id}`),
  createDay: (data) => api.post('/days', data),
  updateDay: (id, data) => api.put(`/days/${id}`, data),
  deleteDay: (id) => api.delete(`/days/${id}`),
};

// Slots API
export const slotsAPI = {
  getSlotsByDay: (dayId, params) => api.get(`/slots/${dayId}`, { params }),
  createSlot: (data) => api.post('/slots', data),
  getMySlots: (params) => api.get('/slots/my', { params }),
  updateSlot: (id, data) => api.put(`/slots/${id}`, data),
  deleteSlot: (id) => api.delete(`/slots/${id}`),
};

// Reservations API
export const reservationsAPI = {
  createReservation: (data) => api.post('/reservations', data),
  getMyReservations: (params) => api.get('/reservations/me', { params }),
  getPendingReservations: () => api.get('/reservations/pending'),
  acceptReservation: (id) => api.post(`/reservations/${id}/accept`),
  rejectReservation: (id, data) => api.post(`/reservations/${id}/reject`, data),
};

// Sessions API
export const sessionsAPI = {
  getMySessions: (params) => api.get('/sessions/me', { params }),
  getSessionById: (id) => api.get(`/sessions/${id}`),
  startSession: (id) => api.post(`/sessions/${id}/start`),
  uploadRecording: (id, formData) => api.post(`/sessions/${id}/recording`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  completeSession: (id, data) => api.post(`/sessions/${id}/complete`, data),
  cancelSession: (id, data) => api.post(`/sessions/${id}/cancel`, data),
};

// Evaluations API
export const evaluationsAPI = {
  createEvaluation: (data) => api.post('/evaluations', data),
  getEvaluationBySession: (sessionId) => api.get(`/evaluations/${sessionId}`),
  updateEvaluation: (id, data) => api.put(`/evaluations/${id}`, data),
  getMyEvaluations: (params) => api.get('/evaluations/my', { params }),
  getEvaluationStats: () => api.get('/evaluations/stats'),
};

// Feedback API
export const feedbackAPI = {
  createFeedback: (data) => api.post('/feedbacks', data),
  getFeedbacksBySession: (sessionId) => api.get(`/feedbacks/${sessionId}`),
  getMyFeedbacks: (params) => api.get('/feedbacks/my', { params }),
  updateFeedback: (id, data) => api.put(`/feedbacks/${id}`, data),
  deleteFeedback: (id) => api.delete(`/feedbacks/${id}`),
  getPublicFeedbacks: (params) => api.get('/feedbacks/public', { params }),
};

// Learning API
export const learningAPI = {
  getContent: (params) => api.get('/learn', { params }),
  getContentById: (id) => api.get(`/learn/${id}`),
  getCategories: () => api.get('/learn/categories'),
  createContent: (data) => api.post('/learn', data),
  updateContent: (id, data) => api.put(`/learn/${id}`, data),
  deleteContent: (id) => api.delete(`/learn/${id}`),
  getContentStats: () => api.get('/learn/stats'),
};
