import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async actions for CRUD operations
export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async () => {
  const response = await axios.get('http://localhost:4000/api/tasks/userTasks', {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
  return response.data;
});


export const createTask = createAsyncThunk('tasks/createTask', async (taskData) => {
  const response = await axios.post('http://localhost:4000/api/tasks/newTask', taskData);
  return response.data;
});

export const updateTask = createAsyncThunk('tasks/updateTask', async (taskData: any) => {
  const { _id, ...updateData } = taskData; // Ensure the correct extraction of _id
  const response = await axios.put(`http://localhost:4000/api/tasks/tasks/${_id}`, updateData);
  return response.data;
});


export const deleteTask = createAsyncThunk('tasks/deleteTask', async (taskId) => {
  await axios.delete(`http://localhost:4000/api/tasks/tasks/${taskId}`);
  return taskId;
});




const taskSlice = createSlice({
  name: 'tasks',
  initialState: {
    tasks: [],
    columns: ['To-Do', 'In Progress', 'Under Review', 'Completed'], 
    loading: false,
    error: null,
  },
  reducers: {
    reorderColumns: (state, action) => {
      const { sourceIndex, destinationIndex } = action.payload;
      const [movedColumn] = state.columns.splice(sourceIndex, 1);
      state.columns.splice(destinationIndex, 0, movedColumn);
    },
    
    setTasks: (state, action) => {
      state.tasks = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.tasks = action.payload;
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.tasks.push(action.payload);
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        const index = state.tasks.findIndex(task => task._id === action.payload._id);
        if (index !== -1) {
          state.tasks[index] = {
            ...state.tasks[index], 
            ...action.payload
          };
        }
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter(task => task._id !== action.payload);
      })
      .addMatcher(
        (action) => action.type.endsWith('/pending'),
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )
      .addMatcher(
        (action) => action.type.endsWith('/fulfilled'),
        (state) => {
          state.loading = false;
        }
      )
      .addMatcher(
        (action) => action.type.endsWith('/rejected'),
        (state, action) => {
          state.loading = false;
          state.error = action.error.message;
        }
      );
  },
});

export const { reorderColumns, setTasks } = taskSlice.actions;

export default taskSlice.reducer;
