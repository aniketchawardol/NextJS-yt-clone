"use client";
import { useRouter } from 'next/navigation';
import React, {useState} from 'react'

function Registerpage() {
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [confirmPassword, setConfirmPassword] = useState('');
   const router = useRouter();

   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })
      
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong');
      }
      console.log("Registration successful:", data);
      router.push('/login'); // Redirect to login page after successful registration
    } catch (error) {
      console.error("Registration error:", error);
      alert("Registration failed. Please try again.");
    }
    // Here you would typically send the data to your backend
    console.log("Email:", email);
    console.log("Password:", password);
    router.push('/login'); // Redirect to login page after registration
  }
  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <input type="email" 
        placeholder='email'
        value={email}
        onChange={(e) => setEmail(e.target.value)}/>
        <input type="password"
        placeholder='password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}/>
        <input type="text" 
        placeholder='Confirm password'
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}/>
        <button type="submit">Register</button>
        <p>Already have an account? <a href="/login">Login</a></p>
      </form>
    </div>
  )
}

export default Registerpage
