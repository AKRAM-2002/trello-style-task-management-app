import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { DragDropContext, Droppable, DropResult } from "@hello-pangea/dnd";
import Column from './Column';
import { fetchTasks, reorderColumns, updateTask, setTasks} from 'store/taskSlice';
import { RootState } from 'store';


const TaskBoard = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const columns = useSelector((state : RootState) => state.tasks.columns);

  useEffect(() => {
    dispatch(fetchTasks() as any);
  }, [dispatch]);

  const handleOnDragEnd = (result: DropResult) => {
    

    const { destination , source, type } = result;

    if (!destination) return;

    // Handle column drag
    if (type === "column") {
      dispatch(reorderColumns({ sourceIndex: source.index, destinationIndex: destination.index }));
    }


    // Handle task drag
    const startColumnId = source.droppableId;
    const endColumnId = destination.droppableId;

    
    // Get the tasks for the current columns
    const startColumn = tasks.filter(task => task.status === startColumnId);
    const endColumn = tasks.filter(task => task.status === endColumnId);

    // Case 1: Dragging between different columns (API call needed)
    if (startColumnId != endColumnId) {

      const movedTask = tasks.find(task => task._id === result.draggableId);

        if (movedTask) {
            const updatedTask = {
                ...movedTask,
                status: endColumnId
            };
            

            // Store the previous state for potential rollback
            const previousTasks = [...tasks];

            // Update the task's status visually
            const updatedTasks = tasks.map(task =>
                task._id === movedTask._id ? updatedTask : task 
            );

            dispatch(setTasks(updatedTasks));

            // Persist the change to the database
            dispatch(updateTask(updatedTask) as any)
                .then((response: any) => {
                    if (response.type === 'tasks/updateTask/fulfilled') {
                        console.log('Task status updated in the database');
                    } else {
                        console.error('Failed to update task in the database, rolling back...');
                        // Rollback the visual change if API call fails
                        dispatch(setTasks(previousTasks));
                    }
                })
                .catch((error: any) => {
                    console.error('API error occurred, rolling back...', error);
                    // Rollback the visual change in case of an API error
                    dispatch(setTasks(previousTasks));
                });
        
    } else {
        // Case 2: Dragging within the same column (only visually change the order) 
        dispatch(reorderColumns({ sourceIndex: source.index, destinationIndex: destination.index }));
    }
  }
};


  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Droppable droppableId="board" direction="horizontal" type="column">
        {(provided) => (
          <div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {columns.map((columnId, index) => (
              <Column
                key={columnId}
                id={columnId}
                todos={tasks.filter((task: any) => task.status === columnId)}
                index={index}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>

  );
};

export default TaskBoard;
