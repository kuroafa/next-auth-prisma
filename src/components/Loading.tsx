"use client";

import React from "react";
import { Loader2 } from "lucide-react";

type Props = {};

const Loading = (props: Props) => {
  return <Loader2 className="animate-spin" size={100} />;
};

export default Loading;
