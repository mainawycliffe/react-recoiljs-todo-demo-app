import React, { useState, ChangeEvent, KeyboardEvent } from 'react';
import { useSetRecoilState } from 'recoil';
import { todoListState } from './Store';

export default function AddTodos() {
  const [todoInputValue, setTodoInputValue] = useState('');
  const [todoExistsErrorClass, setTodoExistsErrorClass] = useState('');
  const setTodoList = useSetRecoilState(todoListState);

  function addTodo({ key }: KeyboardEvent<HTMLInputElement>) {
    if (key === 'Enter') {
      const todo = { todo: todoInputValue, isDone: false };
      setTodoList((state) => {
        const alreadyExists = state.filter(
          (todo) => todo.todo.toLowerCase() === todoInputValue.toLowerCase()
        );
        if (alreadyExists.length > 0) {
          setTodoExistsErrorClass('is-danger');
          return state;
        }
        return [...state, todo];
      });
      setTodoInputValue('');
    }
  }

  function onChange({ target: { value } }: ChangeEvent<HTMLInputElement>) {
    setTodoInputValue(value);
    setTodoExistsErrorClass('');
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
            className={`input is-large is-rounded ${todoExistsErrorClass}`}
            placeholder="Buy Bread, Buy Milk ..."
          />
        </div>
      </div>
    </>
  );
}
