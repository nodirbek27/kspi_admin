import React from "react";
import Root from "../root/index";

import Main from "../pages/Main";
import NewsPage from "../pages/NewsPage";

export const routes = [
    {
      element: <Root />,
      path: "/",
      children: [
        {
          element: <Main />,
          path: "/",
        },
        {
          element: <NewsPage />,
          path: "/yangiliklar",
        },
      ],
    },
  ];
  