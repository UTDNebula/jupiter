'use client';

import Button from '@mui/material/Button';
import { useState } from 'react';

type QuestionProps = {
  question?: string;
  children?: string;
};

const methodObj = {
  methodFn1() {
    return 'string';
  },
  methodFn2() {
    return 'number';
  },
};

methodObj.methodFn1();

function Question(props: QuestionProps) {
  const question = props.question;

  const handleClickArrow = () => {
    setVisible(!visible);
  };

  function handleClick() {
    setVisible(!visible);
  }

  const [visible, setVisible] = useState(false);

  return (
    <div>
      <h2 className="text-2xl">
        {question}
        <Button variant="contained" onClick={handleClick}>
          {visible ? 'Collapse' : 'Expand'}
        </Button>
      </h2>
      {visible && <p>{props.children}</p>}
    </div>
  );
}

export default function Page() {
  return (
    <div className="m-auto mt-16 flex w-128 flex-col gap-8">
      <h1 className="text-4xl">Frequently Asked Questions</h1>
      <Question question="Do you steal my personal information?">
        No of course not, we are not Meta
      </Question>
      <Question question="Are you real?">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Impedit
        dolorum voluptatibus temporibus, explicabo soluta aspernatur.
      </Question>
      <Question question="Fancy question?">No.</Question>
    </div>
  );
}
