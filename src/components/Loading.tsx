import React from "react";
import { SpinnerCircular } from "spinners-react";
import "spinners-react/lib/SpinnerCircular.css";

type Props = {};

const Loading = (props: Props) => {
  return <SpinnerCircular enabled color="black" size="100px" speed={200} />;
};

export default Loading;
