import { QueryClient } from '@tanstack/react-query';

// 앱 전체에서 단 하나의 QueryClient만 생성
export const queryClient = new QueryClient();
