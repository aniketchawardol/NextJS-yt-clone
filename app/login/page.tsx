"use client";
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, {useState} from 'react'

function Loginpage() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const result = await signIn('credentials', {email, password, redirect: false})

    if (result?.error) {
      console.error("Login error:", result.error);
      alert("Login failed. Please check your credentials.");
    } else {
      console.log("Login successful");
      router.push('/'); // Redirect to home page after successful login
    }
  }
  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input type="email" 
        placeholder='email'
        value={email}
        onChange={(e) => setEmail(e.target.value)}/>
        <input type="password"
        placeholder='password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}/>
        <button type="submit">Login</button>
        <p>Don't have an account? <a href="/register">Register</a></p>
      </form>
    </div>
  )
}

export default Loginpage
