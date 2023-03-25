import { lazy } from "react";

const routes = [
  {
    path: "/",
    component: lazy(() => import("@/pages/index")),
  },
  {
    path: "/mint",
    component: lazy(() => import("@/pages/mint")),
  },
  {
    path: "/twitter/:username/:twId",
    component: lazy(() => import("@/pages/twitter")),
  },
];

export default routes;
