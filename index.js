import { useState } from 'react';

export default function Home() {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResponse('');

    const res = await fetch('/api/ai', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt }),
    });

    const data = await res.json();
    setResponse(data.text);
    setLoading(false);
  };

  return (
    <div style={{ maxWidth: '600px', margin: '20px auto', padding: '20px' }}>
      <h1>✈️ SafarBot</h1>
      <p><strong>O'zbekistonliklar uchun AI sayyohlik yordamchisi</strong></p>
      <p>Qayerga borishni xohlaysiz? Rejani men tuzaman.</p>

      <form onSubmit={handleSubmit}>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Masalan: Men Toshkentdan Antalyaga 5 kunlik sayohat qilmoqchiman"
          rows="3"
          style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
          required
        />
        <button 
          type="submit" 
          disabled={loading}
          style={{ padding: '10px 20px', backgroundColor: '#1890ff', color: 'white', border: 'none', borderRadius: '5px' }}
        >
          {loading ? 'Reja tuzilmoqda...' : 'Reja tuzish'}
        </button>
      </form>

      {response && (
        <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#f0f7ff', borderRadius: '8px' }}>
          <h3>📄 Sizning sayohatingiz:</h3>
          <p>{response}</p>
        </div>
      )}
    </div>
  );
}
