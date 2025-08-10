// pages/index.js
import { useState } from 'react';
import Head from 'next/head';

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
    <>
      <Head>
        <title>SafarBot - O'zbek uchun AI Sayyohlik Yordamchisi</title>
        <meta name="description" content="O'zbekcha AI orqali sayohat rejasini avtomatik tuzing" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div style={styles.container}>
        <header>
          <h1>✈️ SafarBot</h1>
          <p><strong>O'zbekistonliklar uchun sun'iy intellekt asosidagi sayyohlik yordamchisi</strong></p>
        </header>

        <main>
          <p>Qayerga borishni xohlaysiz? Sizga to'liq reja tuzib beraman.</p>

          <form onSubmit={handleSubmit} style={styles.form}>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Masalan: Men Toshkentdan Dubayga 5 kunlik sayohat qilmoqchiman"
              rows="3"
              style={styles.textarea}
              required
            />
            <button type="submit" disabled={loading} style={styles.button}>
              {loading ? 'Reja tuzilmoqda...' : 'Reja tuzish'}
            </button>
          </form>

          {response && (
            <div style={styles.response}>
              <h3>📄 Sizning sayohatingiz:</h3>
              <p>{response}</p>
            </div>
          )}
        </main>

        <footer>
          <p>© 2025 SafarBot. Barcha huquqlar himoyalangan.</p>
        </footer>
      </div>
    </>
  );
}

const styles = {
  container: {
    maxWidth: '600px',
    margin: '0 auto',
    padding: '20px',
    fontFamily: "'Segoe UI', sans-serif",
    backgroundColor: '#f9f9fb',
    minHeight: '100vh',
  },
  form: { margin: '20px 0' },
  textarea: {
    width: '100%',
    padding: '12px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    fontSize: '1rem',
    marginBottom: '10px',
  },
  button: {
    backgroundColor: '#1890ff',
    color: 'white',
    border: 'none',
    padding: '12px 20px',
    borderRadius: '8px',
    fontSize: '1rem',
    cursor: 'pointer',
  },
  response: {
    backgroundColor: '#f0f7ff',
    padding: '15px',
    borderRadius: '8px',
    borderLeft: '4px solid #1890ff',
    marginTop: '20px',
  },
};