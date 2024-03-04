import React from "react";
import "./PulseLive.css";
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
