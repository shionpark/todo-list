/**
 * @file API 에러 처리를 위한 유틸리티 함수입니다.
 */
import { isAxiosError } from 'axios';

/**
 * API 요청에서 발생한 에러를 파싱하여 사용자에게 보여줄 메시지를 반환합니다.
 * @param error - 처리할 에러 객체
 * @returns 사용자에게 표시할 에러 메시지 문자열
 */

export const handleApiError = (error: unknown): string => {
  if (isAxiosError(error)) {
    // 서버에서 응답이 온 경우
    if (error.response) {
      return (
        error.response.data.message ||
        `Error: ${error.response.status} ${error.response.statusText}`
      );
    }
    // 요청은 성공했으나 응답이 없는 경우
    if (error.request) {
      return 'No response from server. Please check your network connection.';
    }
  }
  // 그 외의 경우
  if (error instanceof Error) {
    return error.message;
  }
  return 'An unknown error occurred.';
};
