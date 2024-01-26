"use client";
type Props = {};

const TestButton = (props: Props) => {
  return (
    <>
      <button onClick={() => console.log("test click")}>click</button>
    </>
  );
};

export default TestButton;
