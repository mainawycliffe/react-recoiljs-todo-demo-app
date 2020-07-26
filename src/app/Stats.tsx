import React from 'react';
import { useRecoilValue } from 'recoil';
import { todosStats } from './Store';

export default function TodoStats() {
  const stats = useRecoilValue(todosStats);

  return (
    <nav
      className="level has-background-dark has-text-white"
      style={{ padding: '1.5rem' }}
    >
      <div className="level-item has-text-centered">
        <div>
          <p className="heading">Total Todos</p>
          <p className="title has-text-white">{stats.total}</p>
        </div>
      </div>
      <div className="level-item has-text-centered">
        <div>
          <p className="heading">Ongoing</p>
          <p className="title has-text-white">{stats.ongoing}</p>
        </div>
      </div>
      <div className="level-item has-text-centered">
        <div>
          <p className="heading">Done Todos</p>
          <p className="title has-text-white">{stats.complete}</p>
        </div>
      </div>
    </nav>
  );
}
