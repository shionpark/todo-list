/**
 * @hook useFilteredTodos
 * @description
 *   Todo 목록을 완료 여부로만 분류합니다.
 *   검색어 필터링은 수행하지 않습니다.
 *
 * @param {Todo[]} todos - 전체 Todo 배열 (기본값: [])
 * @returns {{
 *   inProgress: Todo[]; // isCompleted === false
 *   completed: Todo[];  // isCompleted === true
 * }}
 *
 * @example
 * const { inProgress, completed } = useFilteredTodos(todos);
 */
import { useMemo } from 'react';
import type { Todo } from '@modules/todo';

export function useFilteredTodos(todos: Todo[] = []) {
  return useMemo(() => {
    const inProgress = todos.filter((t) => !t.isCompleted);
    const completed = todos.filter((t) => t.isCompleted);
    return { inProgress, completed };
  }, [todos]);
}
