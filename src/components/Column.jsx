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
    <div key={column.id} className="flex flex-col py-4 px-2 rounded-3xl dark:bg-neutral-950 bg-gray-100 max-h-fit flex-grow-0  ">
      <div className="md:text-base lg:text-xl text-base font-medium mb-4 pl-2 dark:text-gray-200 text-gray-900">{column.name}</div>
      
      <div className="custom-scrollbar lg:max-h-[calc(100vh-300px)] max-h-[calc(100vh-240px)] overflow-y-auto">
        <Droppable
          droppableId={String(column.id)}>
            {(provided) => (
              <div
                ref = {provided.innerRef}
                {...provided.droppableProps}
                className="flex flex-col gap-3 pb-2 "
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
     
      <form onSubmit={addTodo} className=" py-4 md:px-2 rounded-lg mt-2  ">
        <div className="flex flex-col md:flex-row  md:gap-4 gap-2  ">
          <input 
            type="text" 
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="add todo"
            className="dark:border-none dark:bg-neutral-900 dark:text-gray-100  px-2 py-1 lg:py-2 md:w-full w-3/4 border-gray-900 bg-gray-50 rounded-lg text-neutral-900 font-normal md:text-base lg:text-lg"
            />
          <button 
            type="submit"
            className=" bg-neutral-900 dark:text-gray-300 text-gray-100 md:px-6 py-2 rounded-lg lg:font-semibold  text-base md:text-base lg:text-lg max-w-24 md:max-w-32">Add
          </button>
        </div>
      </form>
     
    </div>
  )
}