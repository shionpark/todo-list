import { useMutation, useQueryClient } from '@tanstack/react-query';

import type { Todo } from '@modules/todo';
import { QUERY_KEYS } from './queryKeys';
import { toggleTodo } from '@lib/api/todo';

export const useToggleTodo = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (todo: Todo) => toggleTodo(todo),

    // 즉시 반영
    onMutate: async (toggled) => {
      await qc.cancelQueries({ queryKey: QUERY_KEYS.TODOS });
      const previous = qc.getQueryData<Todo[]>(QUERY_KEYS.TODOS);

      qc.setQueryData<Todo[]>(QUERY_KEYS.TODOS, (old) =>
        old
          ? old.map((t) =>
              t.id === toggled.id ? { ...t, isCompleted: !t.isCompleted } : t
            )
          : old
      );

      return { previous };
    },

    // 실패 시 롤백
    onError: (_err, _vars, ctx) => {
      if (ctx?.previous) qc.setQueryData(QUERY_KEYS.TODOS, ctx.previous);
    },

    // 최종 동기화
    onSettled: () => {
      qc.invalidateQueries({ queryKey: QUERY_KEYS.TODOS });
    },
  });
};
