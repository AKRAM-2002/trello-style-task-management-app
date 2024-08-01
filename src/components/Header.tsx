import Link from 'next/link';
import Image from 'next/image'; // Ensure this import is correct
import { FaSearch } from 'react-icons/fa';

export default function Header({ username, onCreateNew, onMenuClick}) {
  return (
    <header className="mb-8">
      {/* First row */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <button onClick={onMenuClick} className="mr-4 md:hidden">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <h1 className="text-2xl font-bold">Good morning, {username}!</h1>
        </div>
        <Link href="/help-feedback" className="text-blue-600 hover:underline">
          Help & feedback
        </Link>
      </div>

      {/* Second row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        {/* First Card */}
        <div className="flex-1 bg-white p-4 rounded-lg shadow-md flex items-center">
          <div className="flex-shrink-0 w-1/4">
            <Image
              src="/images/drawing1.png"
              height="80"
              width="80"
              alt="Introducing Tags"
              className="rounded-lg"
            />
          </div>
          <div className="ml-4">
            <h3 className="text-lg font-semibold">Introducing Tags</h3>
            <p className="text-gray-700">Easily organize your tasks by adding relevant tags for better management and searchability.</p>
          </div>
        </div>

        {/* Second Card */}
        <div className="flex-1 bg-white p-4 rounded-lg shadow-md flex items-center">
          <div className="flex-shrink-0 w-1/4">
            <Image
              src="/images/drawing2.png"
              height="80"
              width="80"
              alt="Share Notes Instantly"
              className="rounded-lg"
            />
          </div>
          <div className="ml-4">
            <h3 className="text-lg font-semibold">Share Notes Instantly</h3>
            <p className="text-gray-700">Collaborate effortlessly by sharing notes and updates with your team in real-time.</p>
          </div>
        </div>

        {/* Third Card */}
        <div className="flex-1 bg-white p-4 rounded-lg shadow-md flex items-center">
          <div className="flex-shrink-0 w-1/4">
            <Image
              src="/images/drawing3.png"
              height="80"
              width="80"
              alt="Access Anywhere"
              className="rounded-lg"
            />
          </div>
          <div className="ml-4">
            <h3 className="text-lg font-semibold">Access Anywhere</h3>
            <p className="text-gray-700">Stay productive from any location with seamless access to your tasks and notes from any device.</p>
          </div>
        </div>
      </div>

      {/* Third row */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
        <div className="w-full md:w-auto mb-4 md:mb-0">
          <div className="bg-white p-2 rounded-lg shadow-md flex items-center border border-gray-300">
            <input
              type="text"
              placeholder="Search..."
              className="flex-1 p-2 outline-none bg-transparent"
            />
            <FaSearch className="text-gray-500 mx-2" />
          </div>
        </div>
        <div className="flex -space-x-1">
        
          <button className="px-3 py-1 rounded flex items-center">
            <Image src="/icons/calendar-icon.png" height="20" width="20" alt="Calendar" />
            <span className="ml-2">Calendar view</span>
          </button>
          <button className="px-3 py-1 rounded flex items-center">
            <Image src="/icons/automation-icon.png" height="20" width="20" alt="Automation" />
            <span className="ml-2">Automation</span>
          </button>
          <button className="px-3 py-1 rounded flex items-center">
            <Image src="/icons/filter-icon.png" height="20" width="20" alt="Filter" />
            <span className="ml-2">Filter</span>
          </button>
          <button className="px-3 py-1 rounded flex items-center">
            <Image src="/icons/share-icon.png" height="20" width="20" alt="Share" />
            <span className="ml-2">Share</span>
          </button>
        </div>
        <button onClick={onCreateNew} className="px-4 py-4 bg-purple-600 text-white rounded-full flex items-center mt-4 md:mt-0">
          <Image src="/icons/create-icon.png" height="20" width="20" alt="Create" />
          <span className="ml-2">Create new</span>
        </button>
      </div>
    </header>
  );
}
