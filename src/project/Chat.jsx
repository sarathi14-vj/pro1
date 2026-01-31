import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef(null);
  const navigate = useNavigate();
  const username = localStorage.getItem('fitnessUser');

  useEffect(() => {
    if (!username) navigate('/'); // Protection: if no login, go back
    
    fetch(`http://localhost:5000/api/history/${username}`)
      .then(res => res.json())
      .then(data => setMessages(data));
  }, [username, navigate]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;
    const userMsg = { text: input, sender: 'user' };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch('http://localhost:5000/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: input, username })
      });
      const data = await res.json();
      setMessages(prev => [...prev, { text: data.text, sender: 'bot' }]);
    } catch {
      alert("Error contacting server");
    } finally {
      setLoading(false);
    }
  };

  const styles = {
    screen: { height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#f0f2f5' },
    chatWindow: { width: '400px', height: '85vh', background: 'white', borderRadius: '15px', display: 'flex', flexDirection: 'column', boxShadow: '0 8px 30px rgba(0,0,0,0.1)' },
    header: { background: '#ff5722', color: 'white', padding: '15px', textAlign: 'center', borderTopLeftRadius: '15px', borderTopRightRadius: '15px' },
    msgArea: { flex: 1, padding: '15px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '10px' },
    bubble: (sender) => ({
      alignSelf: sender === 'user' ? 'flex-end' : 'flex-start',
      background: sender === 'user' ? '#ff5722' : '#f1f0f0',
      color: sender === 'user' ? 'white' : 'black',
      padding: '10px 15px', borderRadius: '15px', maxWidth: '80%', fontSize: '14px'
    }),
    inputBar: { padding: '15px', display: 'flex', gap: '8px', borderTop: '1px solid #eee' },
    input: { flex: 1, padding: '10px', borderRadius: '20px', border: '1px solid #ddd', outline: 'none' },
    btn: { background: '#333', color: 'white', border: 'none', borderRadius: '50%', width: '40px', height: '40px', cursor: 'pointer' }
  };

  return (
    <div style={styles.screen}>
      <div style={styles.chatWindow}>
        <div style={styles.header}>
          <h3>Welcome, {username}</h3>
          <small onClick={() => {localStorage.clear(); navigate('/');}} style={{cursor:'pointer', textDecoration:'underline'}}>Logout</small>
        </div>
        <div style={styles.msgArea}>
          {messages.map((m, i) => <div key={i} style={styles.bubble(m.sender)}>{m.text}</div>)}
          {loading && <div style={styles.bubble('bot')}>...typing</div>}
          <div ref={scrollRef} />
        </div>
        <div style={styles.inputBar}>
          <input style={styles.input} value={input} onChange={(e)=>setInput(e.target.value)} onKeyPress={(e)=>e.key==='Enter' && handleSend()} placeholder="Ask fitness tips..."/>
          <button style={styles.btn} onClick={handleSend}>Go</button>
        </div>
      </div>
    </div>
  );
};

export default Chat;