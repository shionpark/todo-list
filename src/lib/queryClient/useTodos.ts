import { useQuery } from '@tanstack/react-query';

import type { Todo } from '@modules/todo';
import { QUERY_KEYS } from './queryKeys';
import { getTodos } from '@lib/api/todo';

export const useTodos = () =>
  useQuery<Todo[]>({
    queryKey: QUERY_KEYS.TODOS,
    queryFn: getTodos,
  });
