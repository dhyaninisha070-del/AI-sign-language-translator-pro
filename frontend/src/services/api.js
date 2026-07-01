// Frontend-only: API is disabled for demonstration
// All API calls are handled by predictionService.js with dummy data

const api = {
  get: () => Promise.reject(new Error('API disabled in frontend-only mode')),
  post: () => Promise.reject(new Error('API disabled in frontend-only mode')),
  put: () => Promise.reject(new Error('API disabled in frontend-only mode')),
  delete: () => Promise.reject(new Error('API disabled in frontend-only mode')),
  interceptors: {
    request: { use: () => {} },
    response: { use: () => {} },
  },
};

export default api;
