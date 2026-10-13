'use client'; // Ignore this
////////////////////////////////////////////////////////////////////////////////
/////////////////////////// START TYPING BELOW THIS ////////////////////////////
////////////////////////////////////////////////////////////////////////////////

const string = 'string';
const number = 5345.874;
const boolean = true;

type Person = {
  name: string;
  age: number;
  isAdmin?: boolean;
};

const person: Person = {
  name: 'John Doe',
  age: 22,
  isAdmin: true,
};

const person2: Person = {
  name: 'John Wick',
  age: 46,
};

function checkIfBothAdmin(
  person: Person,
  person2: Person,
): boolean | undefined {
  return person.isAdmin && person2.isAdmin;
}

const returnValue = checkIfBothAdmin(person, person2);

////////////////////////////////////////////////////////////////////////////////

type ValidColors = 'red' | 'green' | 'blue';

function convertColorToTailwind(color: ValidColors) {
  if (color == 'red') {
    return 'bg-red-200';
  } else if (color == 'green') {
    return 'bg-green-200';
  } else {
    return 'bg-blue-200';
  }
}

////////////////////////////////////////////////////////////////////////////////
/////////////////////// IGNORE EVERYTHING BELOW FOR NOW ////////////////////////
////////////////////////////////////////////////////////////////////////////////

import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import { useState } from 'react';

export default function Page() {
  const [color, setColor] = useState<ValidColors>('red');

  const tailwindClass = convertColorToTailwind(color);

  return (
    <div className={`h-screen w-screen pt-16 ${tailwindClass}`}>
      <div className="m-auto flex w-128 flex-col gap-8">
        <h1 className="text-4xl">Customize Color</h1>
        <ToggleButtonGroup
          value={color}
          exclusive
          onChange={(_, newColor) => setColor(newColor)}
        >
          <ToggleButton value="red">Red</ToggleButton>
          <ToggleButton value="green">Green</ToggleButton>
          <ToggleButton value="blue">Blue</ToggleButton>
        </ToggleButtonGroup>
      </div>
    </div>
  );
}
