import axios from 'axios';

export function handleApiError(error: unknown): string {
  if (axios.isAxiosError(error)) {
    const status = error.response?.status;

    // 서버 응답이 있는 경우
    if (status) {
      if (status >= 500) return '서버 오류가 발생했습니다.';
      if (status === 404) return '요청하신 데이터를 찾을 수 없습니다.';
      if (status === 400) return '잘못된 요청입니다.';
      if (status === 401) return '인증이 필요합니다.';
    }

    // 서버 응답이 없는 경우 (네트워크, 타임아웃 등)
    if (error.code === 'ECONNABORTED') return '요청 시간이 초과되었습니다.';
    return '네트워크 연결을 확인해주세요.';
  }

  // axios가 아닌 경우 (기타 예외)
  return '알 수 없는 오류가 발생했습니다.';
}
