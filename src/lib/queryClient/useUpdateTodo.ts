import { useMutation, useQueryClient } from '@tanstack/react-query';

import type { Todo } from '@modules/todo';
import { QUERY_KEYS } from './queryKeys';
import { updateTodo } from '@lib/api/todo';

// updateTodo(id, payload) 시그니처에 맞춤
export type UpdateTodoPayload = Partial<{
  name: string;
  memo?: string;
  imageUrl?: string;
  isCompleted: boolean;
}>;

export const useUpdateTodo = (id: number) => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload: UpdateTodoPayload) => updateTodo(id, payload),
    onSuccess: (updated: Todo) => {
      // 목록/단건 캐시 동기화
      qc.setQueryData<Todo[]>(QUERY_KEYS.TODOS, (old) =>
        old ? old.map((t) => (t.id === updated.id ? updated : t)) : old
      );
      qc.setQueryData<Todo>(QUERY_KEYS.TODO(id), updated);
    },
  });
};
