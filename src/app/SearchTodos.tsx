import { useSetRecoilState, useRecoilValue } from 'recoil';
import React, { ChangeEvent } from 'react';
import { todoQueryState } from './Store';

export default function SearchBox() {
  const setQuery = useSetRecoilState(todoQueryState);
  const query = useRecoilValue(todoQueryState);

  function onChange({ target: { value } }: ChangeEvent<HTMLInputElement>) {
    // a better approach is to use the onKeyUp event, then check for the enter key
    setQuery(() => value);
  }

  return (
    <>
      <div className="field is-fullwidth">
        <div className="control">
          <input
            className="input is-large is-rounded"
            type="text"
            placeholder="Search for todos"
            onChange={onChange}
            value={query}
          />
        </div>
      </div>
    </>
  );
}
