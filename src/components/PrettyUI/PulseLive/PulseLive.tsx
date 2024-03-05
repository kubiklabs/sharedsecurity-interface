import React from "react";
const PulseLive = ({ top, bottom, left, right }: any) => {
  return (
    <div
      style={{
        top,
        bottom,
        left,
        right,
      }}
      className="circle"
    ></div>
  );
};

export default PulseLive;
