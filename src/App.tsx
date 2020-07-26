import React from 'react';
import { RecoilRoot } from 'recoil';
import AddTodos from './app/AddTodos';
import SearchBox from './app/SearchTodos';
import ListTodos from './app/TodosView';
import TodoStats from './app/Stats';
import './../node_modules/bulma/css/bulma.min.css';

export default function App() {
  return (
    <RecoilRoot>
      <TopBar />
      <section className="section">
        <div className="container">
          <div className="columns">
            <div className="column">
              <div className="columns is-multiline">
                <div className="column is-full">
                  <TodoStats />
                </div>
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
    </RecoilRoot>
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
