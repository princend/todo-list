import { useDrag, useDrop } from 'react-dnd';
import { Todo } from './todo';

type PageSettingProps = {
    newTodo: string;
    setNewTodo: (text: string) => void;
    addTodo: () => void;
    todos: Todo[];
    deleteTodo: (id: number) => void;
    moveTodo: (fromIndex: number, toIndex: number) => void;
};

type DraggableTodoProps = {
    index: number;
    todo: Todo;
    deleteTodo: (id: number) => void;
};


const DraggableTodo: React.FC<DraggableTodoProps> = ({ index, todo, deleteTodo }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'TODO',
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <li
      ref={drag}
      style={{ opacity: isDragging ? 0.5 : 1 }}
      className="list-group-item d-flex justify-content-between align-items-center"
    >
      <span style={{ textDecoration: todo.completed ? 'line-through' : '' }}>
        {todo.text}
      </span>
      <button className="btn btn-danger btn-sm" onClick={() => deleteTodo(todo.id)}>刪除</button>
    </li>
  );
};

const PageSetting: React.FC<PageSettingProps> = ({ newTodo, setNewTodo, addTodo, todos, deleteTodo, moveTodo }) => {
    const [, drop] = useDrop({
        accept: 'TODO',
        drop: (item: { index: number }, monitor) => {
            const delta = monitor.getDifferenceFromInitialOffset();
            const fromIndex = item.index;
            const toIndex = Math.max(0, Math.min(todos.length - 1, fromIndex + (delta?.y || 0) > 0 ? 1 : -1));
            moveTodo(fromIndex, toIndex);
        },
    });

    return (
        <div ref={drop}>
            <h1>設定代辦事項</h1>
            <div className="mb-3">
                <input
                    className="form-control"
                    type="text"
                    value={newTodo}
                    onChange={(e) => setNewTodo(e.target.value)}
                    placeholder="新增代辦事項"
                />
            </div>
            <button className="btn btn-primary mb-3" onClick={addTodo}>新增</button>
            <ul className="list-group">
                {todos.map((todo, index) => (
                    <DraggableTodo
                        key={todo.id}
                        index={index}
                        todo={todo}
                        deleteTodo={deleteTodo}
                    />
                ))}
            </ul>
        </div>
    );
};
export default PageSetting;