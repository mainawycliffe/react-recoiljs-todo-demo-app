import React, { useState, KeyboardEvent, ChangeEvent } from 'react';
import './../node_modules/bulma/css/bulma.min.css';
import { Todo } from './todoType';
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from 'recoil';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckSquare } from '@fortawesome/free-solid-svg-icons';
import { faSquare } from '@fortawesome/free-regular-svg-icons';

const defaultTodoList: Todo[] = [
  {
    todo: 'Cook Supper',
    isDone: true,
  },
  {
    todo: 'Buy Bread',
    isDone: false,
  },
  {
    todo: 'Buy Milk',
    isDone: false,
  },
  {
    todo: 'Buy Flowers',
    isDone: false,
  },
];

const todoListState = atom<Todo[]>({
  key: 'todoListState',
  default: defaultTodoList,
});

export default function App() {
  return (
    <RecoilRoot>
      <AppShell />
    </RecoilRoot>
  );
}

function AppShell() {
  return (
    <>
      <TopBar />
      <section className="section">
        <div className="container">
          <div className="columns">
            <div className="column">
              <div className="columns is-multiline">
                <div className="column is-full">
                  <AddTodos />
                </div>
                <div className="column is-full">
                  <ListTodos />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function TopBar() {
  return (
    <>
      <nav
        className="navbar is-dark"
        role="navigation"
        aria-label="main navigation"
      >
        <div className="container">
          <div className="navbar-menu">
            <div className="navbar-item column">
              <SearchBox />
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

function SearchBox() {
  return (
    <>
      <div className="field is-fullwidth">
        <div className="control">
          <input
            className="input is-large is-rounded"
            type="text"
            placeholder="Search for todos"
          />
        </div>
      </div>
    </>
  );
}

function AddTodos() {
  const [todoInputValue, setTodoInputValue] = useState('');
  const [todoExists, setTodoExists] = useState(false);
  const setTodoList = useSetRecoilState(todoListState);

  function addTodo({ key }: KeyboardEvent<HTMLInputElement>) {
    if (key === 'Enter') {
      const todo = { todo: todoInputValue, isDone: false };
      setTodoList((state) => {
        const alreadyExists = state.filter(
          (todo) => todo.todo.toLowerCase() === todoInputValue.toLowerCase()
        );
        if (alreadyExists.length > 0) {
          setTodoExists(true);
          return state;
        }
        return [...state, todo];
      });
      setTodoInputValue('');
    }
  }

  function onChange({ target: { value } }: ChangeEvent<HTMLInputElement>) {
    setTodoInputValue(value);
    setTodoExists(false);
  }

  return (
    <>
      <h2 className="subtitle is-3">Add Todo</h2>
      <div className="field">
        <div className="control">
          <input
            onKeyDown={addTodo}
            onChange={onChange}
            value={todoInputValue}
            className={`input is-large is-rounded ${
              todoExists ? 'is-danger' : ''
            }`}
            placeholder="Buy Bread, Buy Milk ..."
          />
        </div>
      </div>
    </>
  );
}

function ListTodos() {
  const todoList = useRecoilValue(todoListState);

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
            <TodoItem key={todo.todo} todo={todo} />
          ))}
        </div>
      </div>
    </>
  );
}

type TodoItemProps = {
  todo: Todo;
};

function TodoItem({ todo }: TodoItemProps) {
  function toggleTodo(todo: Todo) {
    console.log(!todo.isDone);
  }

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
