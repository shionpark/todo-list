import { useMutation, useQueryClient } from '@tanstack/react-query';

import type { Todo, CreateTodoPayload } from '@modules/todo';
import { QUERY_KEYS } from '@lib/queryClient/queryKeys';
import { createTodo } from '@lib/api/todo';

export const useCreateTodo = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreateTodoPayload) => createTodo(payload.name),
    onSuccess: (created) => {
      // 즉시 목록 반영
      qc.setQueryData<Todo[]>(QUERY_KEYS.TODOS, (old) =>
        old ? [created, ...old] : [created]
      );
    },
  });
};
