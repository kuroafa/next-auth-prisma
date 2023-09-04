"use client";

import React from "react";
import { SpinnerCircular } from "spinners-react";
import "spinners-react/lib/SpinnerCircular.css";
import { useTheme } from "next-themes";

type Props = {};

const Loading = (props: Props) => {
  const { theme } = useTheme();

  const themeCheck =
    theme === "light" ? "black" : theme === "dark" ? "white" : "gray";

  return (
    <SpinnerCircular enabled color={themeCheck} size="100px" speed={200} />
  );
};

export default Loading;
