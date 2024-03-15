import React from "react";
import Root from "../root/index";

import Main from "../pages/Main";

export const routes = [
    {
      element: <Root />,
      path: "/",
      children: [
        {
          element: <Main />,
          path: "/",
        },
      ],
    },
  ];
  