// ...existing code...
import React, { useState } from 'react';
import API from '../api';
import { useNavigate } from 'react-router-dom';

export default function Login(){
  const [email,setEmail]=useState(''); const [password,setPassword]=useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    if (e && e.preventDefault) e.preventDefault();
    setError('');
    // console.log("👉 FRONTEND sending:", { email, password });

    if (!email.trim() || !password) {
      setError('Please enter email and password');
      return;
    }
    setLoading(true);
    try {
      const res = await API.post('/auth/login', { email, password });
      const token = res?.data?.token;
      if (!token) throw new Error('No token returned');
      localStorage.setItem('token', token);
      navigate('/profile');
    } catch(err){
      setError(err?.response?.data?.msg || err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{maxWidth:400, margin:'auto', padding:20}}>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          placeholder="Email"
          value={email}
          onChange={e=>setEmail(e.target.value)}
          type="email"
          autoComplete="email"
          required
          style={{display:'block', width:'100%', marginBottom:8}}
        />
        <input
          placeholder="Password"
          value={password}
          type="password"
          onChange={e=>setPassword(e.target.value)}
          autoComplete="current-password"
          required
          style={{display:'block', width:'100%', marginBottom:8}}
        />
        {error && <div style={{color:'red', marginBottom:8}}>{error}</div>}
        <button type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
}
