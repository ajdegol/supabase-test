"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const setVal = async (val: boolean) => {
  await fetch("/api/set", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ val }),
  });
};

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
);

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
