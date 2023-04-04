"use client"
import { useState } from "react";

export const Auth = ({supabase}: {supabase: any}) => {
  const [user, setUser] = useState<any>(null);
  const login = async () => {
    const email = "test@test.com";
    const password = "password";
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    setUser(data.user);
  };
  const signup = async () => {
    const email = "test@test.com";
    const password = "password";
    const { data, error } = await supabase.auth.signUp({ email, password });
    setUser(data.user);
  };
  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    setUser(null);
  };

  return (
    <>
      <h1>{user?.email}</h1>
      <div>
        <button onClick={signup}>Signup</button>
      </div>
      <div>
        <button onClick={login}>Login</button>
      </div>
      <div>
        <button onClick={logout}>Logout</button>
      </div>
    </>
  );
};
