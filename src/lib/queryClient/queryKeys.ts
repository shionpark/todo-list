// 쿼리 키를 상수로 관리해서 오타를 방지합니다.
export const QUERY_KEYS = {
  TODOS: ['todos'] as const,
  TODO: (id: number) => ['todo', id] as const,
};
