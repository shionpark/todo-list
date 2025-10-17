'use client';

import {
  QueryClient,
  useQuery,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
  getTodoById,
} from './api';
import type { Todo, TodoUpdatePayload } from '@modules/todo';

// React Query 클라이언트. 앱 전체에서 사용됩니다.
export const queryClient = new QueryClient();

// 쿼리 키를 상수로 관리해서 오타를 방지합니다.
const QUERY_KEYS = {
  TODOS: 'todos',
  TODO: 'todo',
};

// 모든 Todo 목록을 가져오는 훅
export const useTodos = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.TODOS],
    queryFn: getTodos,
  });
};

// 특정 ID의 Todo를 가져오는 훅
export const useTodo = (id: number) => {
  return useQuery({
    queryKey: [QUERY_KEYS.TODO, id],
    queryFn: () => getTodoById(id),
    enabled: !!id, // id가 유효할 때만 쿼리 실행
  });
};

// 새 Todo를 만드는 훅
export const useCreateTodo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createTodo,
    onSuccess: () => {
      // 성공하면 Todo 목록을 다시 불러옵니다.
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.TODOS] });
      toast.success('할 일이 추가되었습니다.');
    },
  });
};

// Todo를 수정하는 훅
export const useUpdateTodo = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  return useMutation({
    mutationFn: ({ id, payload }: { id: number; payload: TodoUpdatePayload }) =>
      updateTodo(id, payload),
    onSuccess: () => {
      // 성공하면 Todo 목록과 상세 정보를 모두 갱신합니다.
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.TODOS] });
      toast.success('할 일이 수정되었습니다.');
      router.push('/'); // 수정 완료 후 목록 페이지로 이동
    },
  });
};

// Todo를 삭제하는 훅
export const useDeleteTodo = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  return useMutation({
    mutationFn: deleteTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.TODOS] });
      toast.success('할 일이 삭제되었습니다.');
      router.push('/'); // 삭제 완료 후 목록 페이지로 이동
    },
  });
};
