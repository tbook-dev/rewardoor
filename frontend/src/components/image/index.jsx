import { Spin } from "antd";
import clsx from "clsx";
import { useState } from "react";

export default function ({ src, className }) {
  const [loading, setLoading] = useState(true);
  return (
    <div className="flex justify-center">
      {loading && <Spin />}
      {
        <img
          src={src}
          className={clsx(loading && "hidden", className)}
          onLoad={() => {
            console.log("loading");
            setLoading(false);
          }}
          onEnded={() => {
            console.log("loading error");
            setLoading(false);
          }}
        />
      }
    </div>
  );
}
