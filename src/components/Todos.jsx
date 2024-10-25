import { Draggable, Droppable , DragDropContext } from "react-beautiful-dnd"
import {useNavigate} from "react-router-dom"
import { useState, useEffect } from "react";
import Column from "./Column";
import axios from "axios";
export default function Todos({}){
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [todos, setTodos] = useState([]);
  const [columns, setColumns] = useState([
    { id: 1, name: "To Do Open List", todos: [] },
    {
      id: 2,
      name: "To Do Closed List",
      todos: [],
    },
    {
      id: 3,
      name: "Done",
      todos: [],
    },
  ]);
  const onDragEnd = async (result) => {
    const {source, destination} = result;
    let todoOrder;
    let todoColId;
    let todoId;
    if(!destination) return;
    const updatedColumns = [...columns];
    // drop todo across different column
    if(source.droppableId !== destination.droppableId){
      const sourceColumn = updatedColumns.find((column) => column.id === parseInt(source.droppableId))
      const destinationColumn = updatedColumns.find((column) => column.id === parseInt(destination.droppableId))
      const sourceItems = [...sourceColumn.todos];
      const destinationItems = [...destinationColumn.todos];
      const [removed] = sourceItems.splice(source.index,1);
      todoId = removed._id;
      todoColId = destinationColumn.id;
      todoOrder = destination.index;
      destinationItems.splice(destination.index,0, removed)
      sourceColumn.todos = sourceItems
      destinationColumn.todos = destinationItems
      
    } 
    // drop across same column
    else{
      // find dropped col id
      const column = updatedColumns.find((column) => column.id === parseInt(source.droppableId))
      const copiedItems = [...column.todos];
      const [removed] = copiedItems.splice(source.index,1);
      todoColId = column.id;
      todoOrder = destination.index;
      todoId = removed._id;
      copiedItems.splice(destination.index,0, removed)
      column.todos = copiedItems

    }
      
    setColumns(updatedColumns)
    try{
      await updateTodo(todoId , {
        order:todoOrder+1,
        columnId:todoColId
      })
      // DEFINE FETCH COLUMNS HERE
    }catch(err){
      console.error("error updating the backend")
    }

  }

  async function updateTodo(todoId, updatedData) {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/${todoId}`,
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
  async function getTodos() {
    try {
      console.log(token);
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/todos`, {
        headers: {
          token: token,
        },
      });
      console.log(response.data);
      return response.data;
    } catch (err) {
      return err;
    }
  }

  useEffect(() => {
    async function fetchAndAssignTodos() {
      const fetchedTodos = await getTodos();
      console.log("fetchedtodos", fetchedTodos)
      const updatedColumns = columns.map((col) => ({
        ...col,
        todos: fetchedTodos.todos
          .filter((todo) => todo.columnId === col.id)
          .sort((a, b) => a.order - b.order),
      }));
      setColumns(updatedColumns);
    }
    if (token) {
      fetchAndAssignTodos();
    }
  }, [token]);


  return(
    <div className="">
      <DragDropContext
        onDragEnd={onDragEnd}>
          <div className="grid grid-cols-3 gap-6 max-w-7xl mx-auto bg-neutral-50 min-h-screen">
            {columns.map((column) => (
              <Column column= {column} setColumns = {setColumns}/>
            ))}
          </div>
      </DragDropContext>
    </div>
  )
}