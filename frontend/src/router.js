import { lazy } from "react";

const routes = [
  {
    path: "/",
    layout: "v1",
    component: lazy(() => import("@/pages/index")),
  },
];

export default routes;
