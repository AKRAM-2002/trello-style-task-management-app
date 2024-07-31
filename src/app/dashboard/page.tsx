'use client';

import { useState, useEffect } from 'react';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import TaskBoard from '@/components/TaskBoard';
import TaskModal from '@/components/TaskModal';


const initialTasks = [
  { id: '1', content: 'Implement User Authentication', status: 'To do', priority: 'High', dueDate: '2024-08-15' },
  { id: '2', content: 'Design Home Page UI', status: 'In progress', priority: 'Medium', dueDate: '2024-08-15' },
  { id: '3', content: 'Integrate Cloud Storage', status: 'Under review', priority: 'High', dueDate: '2024-08-20' },
  { id: '4', content: 'Test Cross-Browser Compatibility', status: 'Finished', priority: 'Low', dueDate: '2024-07-30' },
  { id: '5', content: 'Conduct User Feedback Survey', status: 'In progress', priority: 'Medium', dueDate: '2024-08-05' },
];



export default function Dashboard() {
  const [tasks, setTasks] = useState(initialTasks);
  const [username, setUsername] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // Fetch user data here
    setUsername('Joe Gardner');
  }, []);

  const handleCreateNew = () => {
    setIsModalOpen(true);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar onCreateNew={handleCreateNew} />
      <main className="flex-1 p-10 overflow-auto">
        <Header username={username} onCreateNew={handleCreateNew} />
        <TaskBoard tasks={tasks} setTasks={setTasks} onCreateNew={handleCreateNew} />
        <TaskModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      </main>
    </div>
  );
}