import axios from "axios";
import { Droppable } from "react-beautiful-dnd";
import {useState, useEffect} from "react"
import TodoCard from "./TodoCard";
export default function Column({column,setColumns}){
  const[newTodo, setNewTodo] = useState("")
  const token = localStorage.getItem("token")
  const addTodo = async (e) =>{
    e.preventDefault();
    // create the task object
    const newTask = {
      order:column.todos.length+1,
      title:newTodo,
      columnId:column.id
    }


    try{
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/todos`, newTask , {
        headers:{
          token:token
        }
      })
      console.log("Posted todo , response is", response.data)
      // fetch this column

      const fetchTodos = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/todos` , 
          {headers :{
            token:token
          }

          })
      console.log("FETCHED UPDATED TODO COLUMN," ,fetchTodos.data)
      // update the column state

      setNewTodo("")
      setColumns((prevColumns) =>
        prevColumns.map((col) =>
          col.id === column.id
            ? {
                ...col,
                todos: [...col.todos, response.data.todo],
              }
            : col
        )
      );

    } catch(err){
      console.log("Error while sending post request", err)

    }

  }

  return (
    <div key={column.id} className="flex flex-col p-4 rounded-3xl dark:bg-neutral-950 bg-gray-50 ">
      <div className="text-xl font-medium mb-4 pl-2 dark:text-gray-100">{column.name}</div>
      <div className="max-h-96 overflow-y-auto">
        <Droppable
          droppableId={String(column.id)}>
            {(provided) => (
              <div
                ref = {provided.innerRef}
                {...provided.droppableProps}
                className="flex flex-col gap-3 pb-4"
              >
                {column.todos.map((todo,index) => (
                  <TodoCard 
                    key={index}
                    todo={todo}
                    index={index}
                    setColumns={setColumns}

                    />
                ))}
                {provided.placeholder}

              </div>
            )}
        </Droppable>
      </div>
     
      <form onSubmit={addTodo} className="py-4">
        <div className="flex flex-col md:flex-row  gap-4 mb-8 ">
          <input 
            type="text" 
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="add a todo"
            className="dark:bg-neutral-800 dark:text-gray-100 dark:border-neutral-600 border px-2 py-2 w-full border-gray-900 bg-inherit rounded-lg text-neutral-900 font-normal text-xl"
            />
          <button 
            type="submit"
            className=" bg-neutral-800 text-gray-100 px-6 py-2 rounded-lg font-semibold text-xl max-w-32">Add
          </button>
        </div>
      </form>
     
    </div>
  )
}