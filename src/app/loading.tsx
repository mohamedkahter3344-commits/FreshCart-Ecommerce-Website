import React from "react";
import { InfinitySpin } from "react-loader-spinner";

const loading = () => {
  return (
    <div className="h-screen flex justify-center items-center">
      <InfinitySpin width="200" color="#4fa94d" />
    </div>
  );
};

export default loading;
