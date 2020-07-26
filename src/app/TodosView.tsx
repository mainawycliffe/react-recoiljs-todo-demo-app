import { useRecoilValue, useSetRecoilState } from 'recoil';
import { Todo } from './todoType';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckSquare } from '@fortawesome/free-solid-svg-icons';
import { faSquare } from '@fortawesome/free-regular-svg-icons';
import { filteredTodosState, todoListState } from './Store';

export default function ListTodos() {
  const todoList = useRecoilValue(filteredTodosState);
  const setTodoList = useSetRecoilState(todoListState);

  function toggleTodo(todo: Todo) {
    setTodoList((state) => {
      const todos = state.map((todoInState) => {
        if (todo.todo.toLowerCase() === todoInState.todo.toLowerCase()) {
          return {
            ...todoInState,
            isDone: !todoInState.isDone,
          };
        }
        return todoInState;
      });
      return [...todos];
    });
  }

  return (
    <>
      <h2 className="subtitle is-3">Your Todos</h2>
      <div className="list is-full is-hoverable">
        <div
          style={{
            cursor: 'pointer',
          }}
          className="list-item"
        >
          {todoList.map((todo) => (
            <TodoItem key={todo.todo} todo={todo} toggleTodo={toggleTodo} />
          ))}
        </div>
      </div>
    </>
  );
}

type TodoItemProps = {
  todo: Todo;
  toggleTodo: (todo: Todo) => void;
};

function TodoItem({ todo, toggleTodo }: TodoItemProps) {
  return (
    <>
      <div role="button" className="columns" onClick={() => toggleTodo(todo)}>
        <div className="column">
          <div className="content is-large">{todo.todo}</div>
        </div>
        <div className="column is-narrow">
          <div className="content is-large">
            {todo.isDone && <FontAwesomeIcon icon={faCheckSquare} />}
            {!todo.isDone && <FontAwesomeIcon icon={faSquare} />}
          </div>
        </div>
      </div>
    </>
  );
}
