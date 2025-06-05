const getApiBaseUrl = () => {
  // In development, we're running the frontend on port 5173 and backend on port 3000
  if (import.meta.env.DEV) {
    return 'http://localhost:3000';
  }

  // In production, we'll use the same origin
  return '';
};

export const API_BASE_URL = getApiBaseUrl();

export const API_ENDPOINTS = {
  parseExpense: `${API_BASE_URL}/api/parse-expense`,
} as const;
