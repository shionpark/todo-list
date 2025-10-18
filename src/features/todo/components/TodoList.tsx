import TodoItem from './TodoItem';
import type { Todo } from '@modules/todo';

export default function TodoList({ todos }: { todos: Todo[] }) {
  return (
    <ul className="mt-3 space-y-2">
      {todos.map((todo) => (
        <li key={todo.id}>
          <TodoItem todo={todo} />
        </li>
      ))}
    </ul>
  );
}
