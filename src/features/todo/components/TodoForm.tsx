'use client';

import Input from '@components/Input';
import TodoButton from './TodoButton';
import { useBreakpoint } from '@hooks/useBreakpoint';
import { useTodoInput } from '../hooks/useTodoInput';
import { useCreateTodo } from '@lib/queryClient/useCreateTodo';

export default function TodoForm() {
  const { mutate: addTodo } = useCreateTodo();

  const { value, handleChange, handleSubmit } = useTodoInput(
    (name) => addTodo({ name }) // string → CreateTodoPayload로 변환
  );

  const { sm } = useBreakpoint();

  return (
    <form className="flex flex-1 gap-2" onSubmit={handleSubmit}>
      <Input
        type="search"
        placeholder="할 일을 입력해주세요"
        value={value}
        onChange={handleChange}
      />
      <TodoButton type="submit" variant="add" primary iconOnly={sm} />
    </form>
  );
}
