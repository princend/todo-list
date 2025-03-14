import React from 'react';
import { useEffect, useState } from 'react';
import { Container, Row, Col, Card, ListGroup, Button, Badge } from 'react-bootstrap';

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


  const [checkedCount, setCheckedCount] = useState(0);
  const [unCheckedCount, setUnCheckedCount] = useState(0);

  useEffect(() => {
    setCheckedCount(todos.filter(todo => todo.completed).length);
    setUnCheckedCount(todos.filter(todo => !todo.completed).length);

  }, [todos]);

  return (
    <Container>
      <Row className="justify-content-between align-items-center my-4">
        <Col>
          <h1>代辦清單</h1>
        </Col>
        <Col className="text-end">
          <Button variant="warning" onClick={resetTodos}>重置勾選</Button>
        </Col>
      </Row>
      <Row>
        <Col md={8}>
          <Card>
            <ListGroup variant="flush">
              {todos.map(todo => (
                <ListGroup.Item
                  key={todo.id}
                  className="d-flex justify-content-between align-items-center"
                  onClick={() => toggleTodo(todo.id)}
                  style={{ cursor: 'pointer' }}
                >
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => {}}
                    readOnly
                  />
                  <span className={`ms-3 ${todo.completed ? 'text-decoration-line-through' : ''}`}>
                    {todo.text}
                  </span>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>統計</Card.Title>
              <Card.Text>
                <div>已完成事項: <Badge bg="success">{checkedCount}</Badge></div>
                <div>未完成事項: <Badge bg="danger">{unCheckedCount}</Badge></div>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default PageCheck;
