import axios from "axios";
import { Droppable } from "react-beautiful-dnd";
import {useState, useEffect} from "react"
import TodoCard from "./TodoCard";
export default function Column({column,setColumn}){
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


    } catch(err){
      console.log("Error while sending post request", err)

    }

  }

  return (
    <div key={column.id} className="flex flex-col bg-neutral-950 p-4 rounded-3xl">
      <div className="text-2xl font-bold mb-12 text-gray-100 pl-4">{column.name}</div>
      <form onSubmit={addTodo}>
        <div className="flex gap-4 mb-8">
          <input 
            type="text" 
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="add a todo"
            className="px-2 py-2 border-gray-900 rounded-lg text-neutral-900 font-semibold text-xl"
            />
          <button 
            type="submit"
            className=" bg-neutral-800 text-gray-100 px-6 py-2 rounded-lg font-semibold text-xl">Add
          </button>
        </div>
      </form>
      <Droppable
        droppableId={`${column.id}`}>
          {(provided) => (
            <div
              ref = {provided.innerRef}
              {...provided.droppableProps}
              className="flex flex-col gap-4"
            >
              {column.todos.map((todo,index) => (
                <TodoCard 
                  key={index}
                  todo={todo}
                  index={index}
                  />
              ))}
              {provided.placeholder}

            </div>
          )}
      </Droppable>

      
        
    </div>
  )
}