import { createServerComponentSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { cookies, headers } from "next/headers";
import Home from "./Home";

export default async function ServerHome() {
  const supabase = createServerComponentSupabaseClient({ headers, cookies });
  const {data} = await supabase.from("test_table").select("val").single() as any;
  return <Home serverVal={data.val} />;
}
