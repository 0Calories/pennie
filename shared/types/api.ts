export interface ParseExpenseRequest {
  message: string;
}

export interface ParsedExpense {
  name: string;
  cost: number;
  category: string;
}

export interface ApiSuccessResponse<T> {
  data: T;
}

export interface ApiErrorResponse {
  error: string;
  details: string;
}
