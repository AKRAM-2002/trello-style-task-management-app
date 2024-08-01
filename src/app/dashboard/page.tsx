'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import TaskBoard from '@/components/TaskBoard';
import TaskModal from '@/components/TaskModal';

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [username, setUsername] = useState('Joe Gardner');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get('/api/tasks/AllTasks');
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const handleCreateNew = async (newTask) => {
    try {
      const response = await axios.post('/api/newTask', newTask);
      setTasks([...tasks, response.data]);
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  const handleUpdateTask = async (updatedTask) => {
    try {
      const response = await axios.put(`/api/tasks/${updatedTask.id}`, updatedTask);
      setTasks(tasks.map(task => (task.id === response.data.id ? response.data : task)));
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await axios.delete(`/api/tasks/${taskId}`);
      setTasks(tasks.filter(task => task.id !== taskId));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100 md:flex-row">
      <Sidebar
        onCreateNew={() => setIsModalOpen(true)}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />
      <main className="flex-1 p-4 md:p-10 overflow-auto">
        <Header
          username={username}
          onCreateNew={() => setIsModalOpen(true)}
          onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)}
        />
        <TaskBoard
          tasks={tasks}
          setTasks={setTasks}
          onCreateNew={() => setIsModalOpen(true)}
          onUpdateTask={handleUpdateTask}
          onDeleteTask={handleDeleteTask}
        />
        <TaskModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onCreateNew={handleCreateNew}
        />
      </main>
    </div>
  );
}
