const getApiBaseUrl = () => {
  if (import.meta.env.DEV) {
    return 'http://localhost:3000';
  }

  return '';
};

const API_BASE_URL = `${getApiBaseUrl()}/api`;

export const API_ENDPOINTS = {
  parseExpense: `${API_BASE_URL}/expenses/parse`,
  saveExpense: `${API_BASE_URL}/expenses/save`,
};
