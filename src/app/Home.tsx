"use client";

import { useEffect, useState } from "react";
import { supabase } from "./sup";
import { Auth } from "@/Auth";


const setVal = async (val: boolean) => {
  await fetch("/api/set", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ val }),
  });
};



export default function Home({ serverVal }: { serverVal: boolean }) {
  const [val, setValLocal] = useState(serverVal);

  useEffect(() => {
    const subscription = supabase
      .channel("any")
      .on("postgres_changes", {
        event: "UPDATE",
        schema: "public",
        table: "test_table",
      }, (payload) => {
        console.log("Change received!", payload);
        // console.log("payload", payload);
        setValLocal(payload.new.val);
      })
      .subscribe()

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <div>
      <Auth/>
      <h1>Current val: {`${val}`}</h1>

      <button onClick={() => setVal(true)}>
        set true
      </button>
      <button onClick={() => setVal(false)}>
        set false
      </button>
    </div>
  );
}
