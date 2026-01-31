import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if(user && pass) {
      localStorage.setItem('fitnessUser', user); // Store session
      navigate('/chat');
    }
  };

  const styles = {
    container: { height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', 
      backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1470&auto=format&fit=crop')`,
      backgroundSize: 'cover', backgroundPosition: 'center' },
    box: { background: 'white', padding: '40px', borderRadius: '12px', textAlign: 'center', width: '320px' },
    input: { width: '100%', padding: '12px', margin: '10px 0', borderRadius: '5px', border: '1px solid #ddd', boxSizing: 'border-box' },
    btn: { width: '100%', padding: '12px', background: '#ff5722', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }
  };

  return (
    <div style={styles.container}>
      <div style={styles.box}>
        <h2>Fitness Login</h2>
        <form onSubmit={handleLogin}>
          <input style={styles.input} type="text" placeholder="Username" onChange={(e)=>setUser(e.target.value)} required />
          <input style={styles.input} type="password" placeholder="Password" onChange={(e)=>setPass(e.target.value)} required />
          <button style={styles.btn} type="submit">Enter Gym</button>
        </form>
      </div>
    </div>
  );
};

export default Login;