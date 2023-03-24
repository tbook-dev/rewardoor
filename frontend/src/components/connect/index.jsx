import React from "react";
import { Button } from "antd";

import useSignIn from "@/hooks/useSignIn";

import SwitchNet from "./switch";

export default function () {
  const { loading, handleSignIn } = useSignIn();

  // sui

  return (
    <>
      <SwitchNet />

      <Button type="primary" loading={loading} onClick={handleSignIn}>
        Connect
      </Button>
    </>
  );
}
