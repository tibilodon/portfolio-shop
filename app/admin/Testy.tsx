"use client";
import React from "react";

type Props = { data: any };

const Testy: React.FunctionComponent<Props> = ({ data }) => {
  return (
    <>
      {data.map((item: any) => (
        <div key={item.id}>
          <p>{item.name}</p>
          {item.children && (
            <div style={{ marginLeft: "20px" }}>
              {item.children &&
                item.children.map((obj: any) => (
                  <div key={obj.id}>
                    <p>{obj.name}</p>
                  </div>
                ))}
            </div>
          )}
        </div>
      ))}
    </>
  );
};

export default Testy;
