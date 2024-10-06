'use client';
import { useRef, useState } from "react";

export default function Home() {
  const dragItem = useRef<any>();
  const dragContainer = useRef<any>();

  const initialData = {
    Hero: [
      "Shaktimaan",
      "Krrish",
      "The Flying Jatt",
      "Mr. India",
    ],
    "Indian film": ["Krrish 4", "kalki"],
    Villain: [
      "Mogambo",
      "Kaal",
      "Tamraj Kilvish",
    ],
  };

  const [data, setData] = useState(initialData);
  const [shwSpace, setsShwSpace] = useState<string>('');


  const handleDragStart = (e: any, item: string, container: string, idx: number) => {
    dragItem.current = item;
    dragContainer.current = container;
    e.target.style.opacity = "0.2";
  };

  const handleDragEnd = (e: any) => {
    e.target.style.opacity = "1";
    setsShwSpace('');
  }

  const handleDragOver = (e: any, idx: number, container: string) => {
    setsShwSpace(`${container}_${idx}`);
  }

  const handleDrop = (e: any, targetContainer: any) => {
    setsShwSpace('');
    const item = dragItem.current;
    const sourceContainer = dragContainer.current;
    setData((prev) => {
      const newData = { ...prev };
      newData[sourceContainer] = newData[sourceContainer].filter(
        (i: any) => i !== item
      );

      if ( !newData[targetContainer].includes(item)) {
        // setData call twice times, so that reason i check item already exists or not
        // but i don't understand why setData call twice times?
        let strarr = shwSpace.split('_'); 
        newData[targetContainer].splice(strarr[1], 0, item)
      
      }
      return newData;
    });
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] bg-slate-800 ">
      <div className="text-white tracking-tight ">
        <p className="text-3xl p-1">Next js Drag and Drop</p>
        <p className="text-2xl p-1 ">Without any package or librery</p>
        <hr />
      </div>
      <main className="flex flex-row gap-12 my-auto sm:items-start">
        {Object.keys(data).map((container, index) => (
          <div key={index} className="bg-slate-400 text-amber-100 p-3 rounded-lg" onDrop={(e) => handleDrop(e, container)} onDragOver={e => e.preventDefault()}>
            <h3 className="text-3xl">{container}</h3>
            <hr />
            <div className="text-xl">
              <ul className="p-5 ">

                {data[container].map((item: string, idx: number) => (
                  <>
                    {shwSpace == `${container}_${idx}` && <li className="h-[20px]"></li>}
                    <li key={idx}
                      onDragStart={(e) => handleDragStart(e, item, container, idx)}
                      onDragEnd={handleDragEnd}
                      onDragOver={(e) => handleDragOver(e, idx, container)}
                      draggable="true"
                      className="p-2 px-5 cursor-move rounded-xl bg-slate-500 m-2 hover:mt-2">
                      {item}
                    </li>
                  </>
                ))}
              </ul>
            </div>
          </div>

        ))}

      </main>
    </div>
  );
}
