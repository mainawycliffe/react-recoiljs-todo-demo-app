import { selector, atom } from 'recoil';
import { Todo } from './todoType';
import { defaultTodoList } from '../defaultTodos';

// we will store the list of todos in its own state
export const todoListState = atom<Todo[]>({
  key: 'todoListState',
  default: defaultTodoList,
});

// we will store the query in its own state
export const todoQueryState = atom({
  key: 'todoQueryState',
  default: '', // no query
});

// use selector to be able to search and filter the todo list in todoListState
// store. Learn more https://recoiljs.org/docs/basic-tutorial/selectors
export const filteredTodosState = selector({
  key: 'searchedTodoState',
  get: ({ get }) => {
    const filter = get(todoQueryState);
    const todosList = get(todoListState);
    // return the whole list if query is not set
    if (filter === '') {
      return todosList;
    }
    // use the filter word to return only todos matches the query
    return todosList.filter((todo) => todo.todo.toLowerCase().includes(filter));
  },
});

export const todosStats = selector({
  key: 'todoStats',
  get: ({ get }) => {
    const todos = get(todoListState);

    return {
      total: todos.length,
      complete: todos.filter((todo) => todo.isDone === true).length,
      ongoing: todos.filter((todo) => todo.isDone === false).length,
    };
  },
});
