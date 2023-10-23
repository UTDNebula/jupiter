import { type Dispatch, useReducer, useState } from 'react';

type Officer = {
  name: string;
  position: string;
};
type Column = {
  value: Officer;
  id: number;
};
type action =
  | {
      type: 'remove';
      target: Column['id'];
    }
  | { type: 'update'; target: Column }
  | { type: 'add' };
const reducer = (state: Array<Column>, action: action) => {
  switch (action.type) {
    case 'add':
      return [
        ...state,
        { value: { name: '', position: '' }, id: state.length },
      ];
    case 'remove':
      return state.filter((item) => item.id != action.target);
    case 'update':
      state[state.findIndex((x) => x.id === action.target.id)]!.value =
        action.target.value;
      return state;
  }
};
const OfficerSelector = () => {
  const [columns, dispatch] = useReducer(reducer, []);
  return (
    <div>
      <div className="flex flex-row py-1">
        <h2>Officers</h2>
        <button
          className="ml-auto rounded-lg bg-slate-200 p-2"
          type="button"
          onClick={(e) => {
            dispatch({ type: 'add' });
          }}
        >
          add new officer
        </button>
      </div>
      <div className="space-y-2">
        {columns.map((col) => (
          <OfficerItem key={col.id} column={col} dispatch={dispatch} />
        ))}
      </div>
    </div>
  );
};
export default OfficerSelector;

type OfficerItemProps = {
  column: Column;
  dispatch: Dispatch<action>;
};
const OfficerItem = ({ column, dispatch }: OfficerItemProps) => {
  return (
    <div className="flex flex-row items-center rounded-md bg-slate-300 p-2">
      <div className="flex flex-col">
        <div>
          <input
            type="text"
            placeholder="Name"
            className="mb-1 bg-slate-300 text-xl font-bold text-black"
            onChange={(e) => {
              column.value.name = e.target.value;
              dispatch({ type: 'update', target: column });
            }}
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Position"
            className="bg-slate-300 font-semibold text-black"
            onChange={(e) => {
              column.value.position = e.target.value;
              dispatch({ type: 'update', target: column });
            }}
          />
        </div>
      </div>
      <div className="ml-auto">
        <button
          type="button"
          onClick={() => dispatch({ type: 'remove', target: column.id })}
        >
          remove
        </button>
      </div>
    </div>
  );
};
