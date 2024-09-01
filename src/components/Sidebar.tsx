import Link from 'next/link';
import Image from 'next/image'
import { UserCircleIcon } from '@heroicons/react/24/solid';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'store';

export default function Sidebar({ onCreateNew, isOpen, onClose }) {
  
  const columns = useSelector((state: RootState) => state.tasks.columns);
  const [loading, setLoading] = useState<boolean>(false);
  const [suggestion, setSuggestion] = useState<string>("");

  useEffect(() => {
    if (columns.length === 0) return;

    const fetchSuggestionFunc = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/gpt-summary', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ todos: columns }),
        });
    
        if (!response.ok) {
          throw new Error(`Failed to fetch summary: ${response.statusText}`);
        }
    
        const data = await response.json();
        console.log('Summary fetched:', data);
        setSuggestion(data.content); // Assuming the API returns { content: "summary text" }
      } catch (error) {
        console.error('Error fetching suggestion:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchSuggestionFunc();
  }, [columns]);
  
  
  return (
    <div className={`fixed inset-y-0 left-0 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0 transition duration-200 ease-in-out z-30 bg-white shadow-md w-56 md:h-screen`}>
      <div className="p-4 flex justify-between items-center">
      <Image 
                src="/images/trelloGpt-logo.png"
                alt="Trello Logo"
                width={400}
                height={200}
                className="z-50 w-64 md:w-56 pb-10 md:pb-0 object-contain"
                />
        <button onClick={onClose} className="md:hidden">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <nav className="mt-4">
        <Link href="/dashboard" className="block py-2 px-4 text-gray-600 hover:bg-gray-200">
          <span className="mr-2">🏠</span> Home
        </Link>
        <Link href="/dashboard/boards" className="block py-2 px-4 text-gray-600 hover:bg-gray-200">
          <span className="mr-2">📋</span> Boards
        </Link>
        <Link href="/dashboard/settings" className="block py-2 px-4 text-gray-600 hover:bg-gray-200">
          <span className="mr-2">⚙️</span> Settings
        </Link>
        <Link href="/dashboard/teams" className="block py-2 px-4 text-gray-600 hover:bg-gray-200">
          <span className="mr-2">👥</span> Teams
        </Link>
        <Link href="/dashboard/analytics" className="block py-2 px-4 text-gray-600 hover:bg-gray-200">
          <span className="mr-2">📊</span> Analytics
        </Link>
      </nav>
      <button onClick={onCreateNew} className="mt-4 ml-4 bg-purple-600 text-white px-4 py-4 rounded flex items-center gap-2">
        Create new task
        <Image src="/icons/create-icon.png" height="20" width="20" alt="Create" />
        </button>

        <div className="flex  items-center justify-center px-5 py-4 md:py-5">
            <p className="flex flex-col items-center p-5  text-sm font-light pr-5 shadow-xl rounded-xl w-fit bg-white italic max-w-3xl text-[#0055D1]">
                <UserCircleIcon className="inline-block h-10 w-10 text-blue-500 mr-1" />
                {loading ? (
                  <span>GPT is summarizing your tasks for the day...</span>
                ) : (
                  <span>{suggestion}</span>
                )}
            </p>
        </div>
        
    </div>
  );
}