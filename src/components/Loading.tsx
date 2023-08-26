import React from "react";
import { SpinnerDotted } from "spinners-react";
import "spinners-react/lib/SpinnerDotted.css";

type Props = {};

const Loading = (props: Props) => {
  return <SpinnerDotted enabled color="black" size="100px" speed={100} />;
};

export default Loading;
