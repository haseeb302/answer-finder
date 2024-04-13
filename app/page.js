"use client";

import DecisionTreeComponent from "@/components/ui/DecisionTreeComponent";
import treeData2 from "@/components/data2.json";
import treeData from "@/components/data.json";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function Home() {
  const [data, setData] = useState(null);
  return (
    <main className="">
      {data ? (
        <DecisionTreeComponent data={data} />
      ) : (
        <div className="flex flex-row min-h-screen justify-center items-center space-x-4">
          <Button className="p-10" onClick={() => setData(treeData)}>
            Dataset 1
          </Button>
          <Button className="p-10" onClick={() => setData(treeData2)}>
            Dataset 2
          </Button>
        </div>
      )}
    </main>
  );
}
