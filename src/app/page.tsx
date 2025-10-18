'use client';

import { Loader } from 'lucide-react';

import { useTodos } from '@lib/queryClient/useTodos';
import TodoForm from 'features/todo/components/TodoForm';
import TodoSection from 'features/todo/components/TodoSection';
import { useFilteredTodos } from 'features/todo/hooks/useFilteredTodos';

export default function Home() {
  const { data: todos = [], isLoading, isError, error } = useTodos();
  const { inProgress, completed } = useFilteredTodos(todos);

  if (isLoading) {
    return (
      <div className="flex justify-center py-10">
        <Loader />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center text-red-500">
        데이터를 불러오는 중 오류가 발생했습니다: {error.message}
      </div>
    );
  }

  return (
    <>
      <TodoForm />
      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <TodoSection
          title="TO DO"
          color="bg-lime-300"
          textColor="text-green-800"
          todos={inProgress}
          emptyImage="/images/empty_todo.png"
          emptyText="할 일이 없어요. TODO를 새롭게 추가해보세요!"
        />

        <TodoSection
          title="DONE"
          color="bg-green-800"
          textColor="text-yellow-400"
          todos={completed}
          emptyImage="/images/empty_done.png"
          emptyText="아직 완료된 일이 없어요. 해야 할 일을 체크해보세요!"
        />
      </div>
    </>
  );
}
