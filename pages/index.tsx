import { FormEvent, useState } from 'react';

export default function Home() {
  const [text, setText] = useState('');
  const [id, setId] = useState('');

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const response = await fetch('/api/create', {
      method: 'POST',
      body: JSON.stringify({ id, text }),
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
        <input 
          type="text" 
          className="w-full p-2 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600" 
          value={id} 
          onChange={(e) => setId(e.target.value)} 
          placeholder="Enter a custom ID (optional)"
        />
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
          Create
        </button>
      </form>
    </div>
  );
}
