import TodoList from './TodoList';
import EmptyState from './EmptyState';
import type { Todo } from '@modules/todo';

interface Props {
  title: string;
  color: string;
  textColor: string;
  todos: Todo[];
  emptyImage: string;
  emptyText: string;
}

export default function TodoSection({
  title,
  color,
  textColor,
  todos,
  emptyImage,
  emptyText,
}: Props) {
  return (
    <section>
      <div
        className={`w-24 rounded-3xl ${color} p-1.5 text-center font-bold ${textColor}`}
      >
        {title}
      </div>

      {todos.length > 0 ? (
        <TodoList todos={todos} />
      ) : (
        <EmptyState image={emptyImage} title={emptyText} />
      )}
    </section>
  );
}
