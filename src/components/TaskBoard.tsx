import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import Image from 'next/image';

export default function TaskBoard({ tasks, setTasks, onCreateNew, onUpdateTask, onDeleteTask }) {
  const onDragEnd = (result) => {
    if (!result.destination) return;

    const newTasks = Array.from(tasks);
    const [reorderedItem] = newTasks.splice(result.source.index, 1);
    reorderedItem.status = result.destination.droppableId;
    newTasks.splice(result.destination.index, 0, reorderedItem);

    setTasks(newTasks);
    onUpdateTask(reorderedItem);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
        {['To do', 'In progress', 'Under review', 'Finished'].map((status) => (
          <Droppable key={status} droppableId={status}>
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="bg-gray-100 rounded-lg"
              >
                <h2 className="font-semibold mb-4">{status}</h2>
                {tasks
                  .filter((task) => task.status === status)
                  .map((task, index) => (
                    <Draggable key={task.id} draggableId={task.id} index={index}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="bg-white p-4 mb-2 rounded shadow"
                        >
                          <h3 className="font-semibold">{task.content}</h3>
                          {task.priority && (
                            <span className={`text-xs px-2 py-1 rounded ${
                              task.priority === 'High' ? 'bg-red-200' :
                              task.priority === 'Medium' ? 'bg-yellow-200' :
                              'bg-green-200'
                            }`}>
                              {task.priority}
                            </span>
                          )}
                          {task.dueDate && <p className="text-sm text-gray-500">{task.dueDate}</p>}
                          <button onClick={() => onDeleteTask(task.id)}>Delete</button>
                        </div>
                      )}
                    </Draggable>
                  ))}
                {provided.placeholder}
                <button onClick={onCreateNew} className="flex justify-between items-center mt-2 p-1 w-full bg-black hover:bg-gray-400 text-gray-800 py-2 rounded">
                  <span className='text-secondary-500'>
                    Add new
                  </span>
                  <Image src="/icons/plus-icon.png" height="20" width="20" alt="Create" />
                </button>
              </div>
            )}
          </Droppable>
        ))}
      </div>
    </DragDropContext>
  );
}
