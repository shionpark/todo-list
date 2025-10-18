/**
 * @file 단일 Todo 항목을 표시하는 컴포넌트.
 * 완료 상태 토글 및 상세 페이지 이동 기능을 포함합니다.
 */
'use client';

import { useToggleTodo } from '@lib/queryClient/useToggleTodo';
import type { Todo } from '@modules/todo';
import { Check } from 'lucide-react';
import { useId } from 'react';

interface TodoItemProps {
  todo: Todo;
}

export default function TodoItem({ todo }: TodoItemProps) {
  const checkboxId = useId();

  const { mutate: toggle, isPending } = useToggleTodo();

  const handleToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation(); // 상위 클릭(네비게이션) 방지
    toggle(todo); // todo만 넘기면 훅 내부에서 !isCompleted로 패치
  };

  return (
    <div
      className={`border-text flex items-center justify-between rounded-3xl border-2 p-2 ${todo.isCompleted ? 'bg-violet-100' : 'bg-white'}`}
    >
      <div className="flex flex-1 items-center gap-4">
        <label
          htmlFor={checkboxId} // 항목마다 다른 id
          className={`h-7 w-7 cursor-pointer rounded-full border-2 border-slate-800 ${todo.isCompleted ? 'bg-primary hover:bg-primary-100' : 'bg-amber-50 hover:bg-amber-100'}`}
        >
          {todo.isCompleted && (
            <Check className="p-0.5 text-slate-100" strokeWidth={4} />
          )}
          <input
            id={checkboxId}
            type="checkbox"
            checked={todo.isCompleted}
            onChange={handleToggle}
            disabled={isPending}
            className="sr-only"
          />
        </label>
        <span
          className={`flex-1 truncate ${todo.isCompleted ? 'text-slate-400 line-through' : 'text-slate-500'}`}
        >
          {todo.name}
        </span>
      </div>
    </div>
  );
}
