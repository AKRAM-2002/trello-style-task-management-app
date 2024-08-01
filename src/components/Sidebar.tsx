import Link from 'next/link';
import Image from 'next/image'

export default function Sidebar({ onCreateNew, isOpen, onClose }) {
  return (
    <div className={`fixed inset-y-0 left-0 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0 transition duration-200 ease-in-out z-30 bg-white shadow-md w-56 md:h-screen`}>
      <div className="p-4 flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Workflo</h2>
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
        
    </div>
  );
}