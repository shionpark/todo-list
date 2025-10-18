import { useQuery } from '@tanstack/react-query';

import type { Todo } from '@modules/todo';
import { QUERY_KEYS } from './queryKeys';
import { getTodoById } from '@lib/api/todo';

export const useTodo = (id: number) =>
  useQuery<Todo>({
    queryKey: QUERY_KEYS.TODO(id),
    queryFn: () => getTodoById(id),
    enabled: !!id,
  });
