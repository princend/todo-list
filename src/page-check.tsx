import React from 'react';

type Todo = {
  id: number;
  text: string;
  completed: boolean;
};




type PageCheckProps = {
  todos: Todo[];
  toggleTodo: (id: number) => void;
  resetTodos: () => void;
};

const PageCheck: React.FC<PageCheckProps> = ({ todos, toggleTodo, resetTodos }) => {
  return (
    <div>
      <h1>代辦清單</h1>
      <button className="btn btn-warning mb-3" onClick={resetTodos}>
        重置勾選
      </button>


      <div className="container">
        <ul className="list-group">
          {todos.map(todo => (
            <li
              key={todo.id}
              className="list-group-item d-flex justify-content-between align-items-center"
              onClick={() => toggleTodo(todo.id)}  // 點擊整個項目切換勾選
              style={{ cursor: 'pointer' }}  // 添加手形游標
            >
              <input
                type="checkbox"
                className="todo-checkbox"
                checked={todo.completed}
                onChange={() => { }}
                readOnly  // 禁止直接修改勾選框，只有點擊項目才會改變
              />
              <span className="ms-3">{todo.text}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PageCheck;
