import express from 'express';
import Task from '../models/Task'; 

const router = express.Router();

//// POST /api/tasks - Create a new task
router.post('/newTask', async (req, res) => {
    try {
      const { title, description, status, priority, deadline, userId } = req.body;
      const newTask = new Task({
        title,
        description,
        status,
        priority,
        deadline,
        userId,
      });
      const savedTask = await newTask.save();
      res.status(201).json(savedTask);
    } catch (error) {
      res.status(500).json({ message: 'Failed to create task', error });
    }
  });


// Get all tasks
router.get('/AllTasks', async (_req, res) => {
  try {
    const tasks = await Task.find();
    return res.status(200).json(tasks);
  } catch (error) {
    return res.status(500).json({ message: 'Failed to fetch tasks' });
  }
});

// Update a task by ID
router.put('/tasks/:id', async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    return res.status(200).json(task);
  } catch (error) {
    return res.status(500).json({ message: 'Failed to update task' });
  }
});

// Delete a task by ID
router.delete('/tasks/:id', async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    return res.status(200).json({ message: 'Task deleted' });
  } catch (error) {
    return res.status(500).json({ message: 'Failed to delete task' });
  }
});

export default router;