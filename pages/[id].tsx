import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function Snippet() {
  const router = useRouter();
  const { id } = router.query;
  
  const [text, setText] = useState('');

  useEffect(() => {
    if (id) {
      const getText = async () => {
        const response = await fetch(`/api/${id}`);
        const { text } = await response.json();
        setText(text);
      };

      getText();
    }
  }, [id]);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    alert('文本已复制到剪贴板');
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-200">
      <div className="p-10 bg-white rounded shadow-md w-1/2">
        <h1 className="mb-4 text-xl font-bold">文本片段</h1>
        <pre className="p-4 bg-gray-100 rounded">{text}</pre>
        <button 
          onClick={handleCopy} 
          className="mt-4 p-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          复制到剪贴板
        </button>
      </div>
    </div>
  );
}
