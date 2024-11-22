import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Outlet, Navigate } from 'react-router-dom';
import './App.css';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import PageCheck from './page-check';
import PageSetting from './page-setting';
import { Todo } from './todo';


const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [nextId, setNextId] = useState<number>(1);
  const [newTodo, setNewTodo] = useState<string>('');
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [navWidth, setNavWidth] = useState(100);

  // 讀取 Local Storage 中的 todos
  useEffect(() => {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
      const parsedTodos: Todo[] = JSON.parse(savedTodos);
      setTodos(parsedTodos);
      setNextId(parsedTodos.length > 0 ? parsedTodos[parsedTodos.length - 1].id + 1 : 1);
    }
  }, []);

  // 當 todos 發生變化時，儲存到 Local Storage
  useEffect(() => {
    if (todos.length > 0) {
      localStorage.setItem('todos', JSON.stringify(todos));
    }
  }, [todos]);

  const addTodo = () => {
    if (newTodo.trim()) {
      const newTodoItem: Todo = {
        id: nextId,
        text: newTodo,
        completed: false,
      };
      setTodos([...todos, newTodoItem]);
      setNextId(nextId + 1);
      setNewTodo('');
    }
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const toggleTodo = (id: number) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const resetTodos = () => {
    setTodos(todos.map(todo => ({ ...todo, completed: false })));
  };

  const moveTodo = (fromIndex: number, toIndex: number) => {
    const updatedTodos = [...todos];
    const [removed] = updatedTodos.splice(fromIndex, 1);
    updatedTodos.splice(toIndex, 0, removed);
    setTodos(updatedTodos);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <Router>
        <div className="App d-flex">
          <button 
            className="btn btn-light position-fixed"
            style={{ 
              zIndex: 1000, 
              left: isNavOpen ? `${navWidth + 10}px` : '10px', 
              top: '10px',
              transition: 'left 0.3s ease-in-out'
            }}
            onClick={() => setIsNavOpen(!isNavOpen)}
          >
            {isNavOpen ? '←' : '☰'}
          </button>

          <div 
            className="navbar-nav flex-column bg-light p-3"
            style={{ 
              width: `${navWidth}px`, 
              height: '100vh',
              position: 'fixed',
              transform: `translateX(${isNavOpen ? '0' : '-100%'})`,
              transition: 'transform 0.3s ease-in-out',
              zIndex: 999
            }}
          >
            <Link className="nav-link" to="/todo-list/page-check">檢查</Link>
            <Link className="nav-link" to="/todo-list/page-setting">設定</Link>
            
            <div
              style={{
                width: '8px',
                height: '100%',
                position: 'absolute',
                right: 0,
                top: 0,
                cursor: 'ew-resize',
                backgroundColor: 'transparent'
              }}
              onMouseDown={(e) => {
                const startX = e.pageX;
                const startWidth = navWidth;

                const handleMouseMove = (e: MouseEvent) => {
                  const newWidth = startWidth + (e.pageX - startX);
                  setNavWidth(Math.max(150, Math.min(400, newWidth)));
                };

                const handleMouseUp = () => {
                  document.removeEventListener('mousemove', handleMouseMove);
                  document.removeEventListener('mouseup', handleMouseUp);
                };

                document.addEventListener('mousemove', handleMouseMove);
                document.addEventListener('mouseup', handleMouseUp);
              }}
            />
          </div>

          <div style={{ 
            marginLeft: isNavOpen ? `${navWidth}px` : '0',
            transition: 'margin-left 0.3s ease-in-out',
            width: '100%'
          }}>
            <div className="container-fluid mt-4">
              <div className="row">
                <div className="col-12 col-md-9">
                  <Routes>
                    <Route path="/" element={<Navigate to="/todo-list/page-check" />} />
                    <Route path="/todo-list/*" element={
                      <div>
                        <Outlet />
                      </div>
                    }>
                      <Route path="page-check" element={<PageCheck
                        todos={todos}
                        toggleTodo={toggleTodo}
                        resetTodos={resetTodos}
                      />} />
                      <Route path="page-setting" element={<PageSetting
                        newTodo={newTodo}
                        setNewTodo={setNewTodo}
                        addTodo={addTodo}
                        todos={todos}
                        deleteTodo={deleteTodo}
                        moveTodo={moveTodo}
                      />} />
                    </Route>
                  </Routes>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Router>
    </DndProvider>
  );
};
export default App;
