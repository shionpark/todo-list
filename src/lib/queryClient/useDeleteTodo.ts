import { useMutation, useQueryClient } from '@tanstack/react-query';

import type { Todo } from '@modules/todo';
import { QUERY_KEYS } from './queryKeys';
import { deleteTodo } from '@lib/api/todo';

export const useDeleteTodo = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteTodo(id),

    onMutate: async (id) => {
      await qc.cancelQueries({ queryKey: QUERY_KEYS.TODOS });
      const previous = qc.getQueryData<Todo[]>(QUERY_KEYS.TODOS);

      qc.setQueryData<Todo[]>(QUERY_KEYS.TODOS, (old) =>
        old ? old.filter((t) => t.id !== id) : old
      );

      return { previous };
    },

    onError: (_e, _id, ctx) => {
      if (ctx?.previous) qc.setQueryData(QUERY_KEYS.TODOS, ctx.previous);
    },

    onSettled: () => {
      qc.invalidateQueries({ queryKey: QUERY_KEYS.TODOS });
    },
  });
};
