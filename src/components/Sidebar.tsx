import Link from 'next/link';
import Image from 'next/image'

export default function Sidebar({ onCreateNew}) {
  return (
    <div className="w-56 bg-white shadow-md h-screen">
      <div className="p-4">
        <h2 className="text-2xl font-semibold">Workflo</h2>
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