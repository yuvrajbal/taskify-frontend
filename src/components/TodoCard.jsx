import { Draggable } from "react-beautiful-dnd";
import { useState, useEffect, useRef} from "react";
import axios from "axios";
export default function TodoCard({todo,index, setColumns}){
  
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(todo.title);
  const inputRef = useRef(null);
  const token = localStorage.getItem("token")
  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  async function updateTodo(todoId, updatedData) {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/todos/${todoId}`,
        updatedData,
        {
          headers: {
            token: token,
          },
        }
      );
      console.log("todo updated", response.data);
    } catch (err) {
      console.log("error while updating", err);
    }
  }

  const deleteTodo = async () => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/todos/${todo._id}`,
        {
          headers: {
            token: token,
          },
        }
      );
      console.log(response.data);

      // delete todo from state
      setColumns((prevColumns) =>
        prevColumns.map((col) =>
          col.id === todo.columnId
            ? {
                ...col,
                todos: col.todos.filter((t) => t._id !== todo._id),
              }
            : col
        )
      );
    } catch (err) {
      console.log(err);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleTitleUpdate();
    }
  };

  const handleTitleUpdate = async () => {
    await updateTodo(todo._id, { title });

    setColumns((prevColumns) =>
      prevColumns.map((col) =>
        col.id === todo.columnId
          ? {
              ...col,
              todos: col.todos.map((t) =>
                t._id === todo._id ? { ...t, title: title } : t
              ),
            }
          : col
      )
    );
    setIsEditing(false);
  };

  return(
    <Draggable key={todo.order} draggableId={todo._id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="flex justify-between bg-gray-100 dark:bg-neutral-800 dark:border-neutral-600 border-gray-700 border-2 px-4 py-2 text-lg font-normal rounded-lg "
        >
          {isEditing ? (
            <input
              type="text"
              ref={inputRef}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onBlur = {handleTitleUpdate}
              onKeyDown={handleKeyDown}
              className="bg-gray-100 w-3/4 px-4 py-2 dark:bg-inherit dark:text-gray-100"
            />) : (
            <div 
              onClick={() => setIsEditing(true)}
              className="w-5/6 break-words dark:text-gray-100"
            >
              {todo.title}
            </div>)
          }

          <button
            className=""
            onClick={deleteTodo}> 
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6 dark:stroke-white stroke-black">
            <path stroke-linecap="round" stroke-linejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
          </svg>


          </button> 
        </div>
      )}
    </Draggable>
  )
}