import { createRouteHandlerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { cookies, headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { val } = await request.json();

  const supabase = createRouteHandlerSupabaseClient({
    headers,
    cookies,
  });

  const cookiesList = cookies();
  console.log("Cookies: ", cookiesList.getAll())

  try {
    const { data: userData } = await supabase.auth.getUser();
    const user = userData?.user;
    if (!user) {
      return NextResponse.json({ error: "User not found BOY" }, { status: 404 });
    }

    // Update profile
    const { data, error } = await supabase.from("test_table").update({
      val: val,
    })
    .eq("user", user.id).select("*");
    

    console.log("Data: ", data);
    

    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 400 });
  }
}
