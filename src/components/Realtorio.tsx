"use client"
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import axios from "axios";

type Props = {
 
};

interface ChatLogItem {
  type: string;
  message: string;
}

const Realtorio = (props: Props) => {



  return (
    <div>
      <div className="relative top-[100px]">
      

        <h1 className="text-3xl">
          <strong className="text-stone-500">Realtor AI</strong>, your personal
          assistant
        </h1>
        <form >
          <input
            type="text"
            placeholder="Ask Realtor AI anything..."
            // value={inputValue}
            // onChange={(e) => setInputValue(e.target.value)}
          />
          <Button type="submit">Send</Button>
        </form>
      </div>
    </div>
  );
};

export default Realtorio;
