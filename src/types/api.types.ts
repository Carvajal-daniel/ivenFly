export interface ApiResponse {
  error?: string;
  message?: string;
  [key: string]: unknown;
}
