"use client"

import { useState } from "react";

type Props = {};

const page = (props: Props) => {
    const [input, setInput] = useState('')
    console.log(input)
  return (
    <div className="w-[90%] h-[90%] m-5 bg-slate-200 dark:bg-slate-600 rounded-2xl">
      <h1 className="p-5 text-left text-4xl font-bold">Realtor AI</h1>
      <div className="flex w-full h-full pb-10  justify-center ">
          <div className="w-[90%] h-[90%] flex flex-col items-center rounded-xl p-5 bg-gray-900">


            <div className="w-full h-[90%]  p-10 ">
             <h1 className="text-white">text</h1>
            </div>
          
              <div className="flex w-full flex-col gap-3 items-center">
                <div className="relative w-full">
                    <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                
                      rows={2}
                      placeholder="Ask realtor ai anything"
                      className="border-2 w-full border-gray-300 bg-white p-4 rounded-lg text-sm focus:outline-none resize-none"
                    />
                    <div className="absolute bottom-2 right-2 text-gray-400 text-sm p-1">
                    <span>{input.length}</span>/30
                </div>
                </div>
                
                <button className="bg-gray-800 w-full hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-lg">
                  generate
                </button>
              </div>
          </div>
      </div>
    </div>
  );
};

export default page;
