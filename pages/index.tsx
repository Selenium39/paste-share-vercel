import { FormEvent, useState } from 'react';

export default function Home() {
  const [text, setText] = useState('');
  const [id, setId] = useState('');
  const [expiry, setExpiry] = useState('86400'); // 默认为1天

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const response = await fetch('/api/create', {
      method: 'POST',
      body: JSON.stringify({ id, text, expiry }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const { id: responseId } = await response.json();
    window.location.href = `/${responseId}`;
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-200">
      <form className="p-10 bg-white rounded shadow-md w-1/2" onSubmit={handleSubmit}>
      <h1 className="mb-4 text-2xl font-bold text-center">文本分享网站</h1>
        <input 
          type="text" 
          className="w-full p-2 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600" 
          value={id} 
          onChange={(e) => setId(e.target.value)} 
          placeholder="输入自定义ID（可选）"
        />
        <select 
          className="w-full p-2 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
          value={expiry}
          onChange={(e) => setExpiry(e.target.value)}
        >
          <option value="3600">1小时</option>
          <option value="86400">1天</option>
          <option value="604800">1周</option>
        </select>
        <textarea 
          className="w-full p-2 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600" 
          value={text} 
          onChange={(e) => setText(e.target.value)} 
          required 
        />
        <button 
          type="submit" 
          className="w-full p-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          创建
        </button>
      </form>
    </div>
  );
}
