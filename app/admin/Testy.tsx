"use client";
import React from "react";

type Props = { data: any };

const Testy: React.FunctionComponent<Props> = ({ data }) => {
  console.log(data);
  return <div>Testy</div>;
};

export default Testy;
