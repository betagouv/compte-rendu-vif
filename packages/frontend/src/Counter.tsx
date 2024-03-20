import { useEffect, useState } from "react";
import { getOrCreateHandle } from "./automerge";
import { useDocument } from "@automerge/automerge-repo-react-hooks";
import { AnyDocumentId } from "@automerge/automerge-repo";

export const Counter = () => {
  return null;
  //   const [count, setCount] = useDocument<{ count: any }>(
  //     "test1" as AnyDocumentId
  //   );
  //   console.log(count);
  //   //   useEffect(() => {
  //   //     const handle = getOrCreateHandle("test1", { count: 0 });
  //   //     handle.on("change", (doc) => {
  //   //       console.log(doc);
  //   //       // console.log("doc", doc);
  //   //       // setCount(doc);
  //   //     });
  //   //   }, []);

  //   return (
  //     <div>
  //       <button onClick={() => setCount(count + 1)}>Increment</button>
  //       <p>Count is: {count}</p>
  //     </div>
  //   );
};
