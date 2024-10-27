import { Draggable, Droppable , DragDropContext } from "react-beautiful-dnd"
import {useNavigate} from "react-router-dom"
import { useState, useEffect } from "react";
import Column from "./Column";
import axios from "axios";
export default function Todos({}){
  const token = localStorage.getItem("token");
  // const [todos, setTodos] = useState([]);
  const [columns, setColumns] = useState([
    { id: 1, name: "Open List", todos: [] },
    {
      id: 2,
      name: "Closed List",
      todos: [],
    },
    {
      id: 3,
      name: "Done",
      todos: [],
    },
  ]);
  const [loading,setLoading] = useState(true)

  const reorderTodos = (todos) => {
    return todos.map((todo,index) => ({
      ...todo,
      order:index+1
    }))
  }

  const onDragEnd = async (result) => {
    const {source, destination} = result;
    let todoOrder;
    let todoColId;
    let todoId;
    if(!destination) return;
    // const updatedColumns = [...columns];
    // console.log("updated columns", updatedColumns)
    let impactedTodos = [];
    // drop todo across different column
    if(source.droppableId !== destination.droppableId){
      // find source and destination col
      const sourceColumn = columns.find((column) => column.id === parseInt(source.droppableId))
      const destinationColumn = columns.find((column) => column.id === parseInt(destination.droppableId))
      // console.log("source col", sourceColumn , "destination col", destinationColumn)
      const sourceTodos = [...sourceColumn.todos];
      const destinationTodos = [...destinationColumn.todos];
      console.log("source and dest todos", sourceTodos,destinationTodos)

      const [movedTodo] = sourceTodos.splice(source.index,1);
      console.log("moved todo", movedTodo)
      // update col id of moved todo
      movedTodo.columnId = destinationColumn.id
      console.log("updated movedtodo dest col id",movedTodo)
      todoId = movedTodo._id;
      todoColId = destinationColumn.id;
      todoOrder = destination.index;

      destinationTodos.splice(destination.index,0, movedTodo)
      console.log("added to dest todo col", destinationTodos)
      sourceColumn.todos = reorderTodos(sourceTodos)
      destinationColumn.todos = reorderTodos(destinationTodos)
      console.log("source and dest col todos after reordering", sourceColumn.todos, destinationColumn.todos)
      impactedTodos = [...sourceColumn.todos, ...destinationColumn.todos]
      console.log(impactedTodos)

      setColumns((prevColumns) =>
        prevColumns.map((col) =>
          col.id === parseInt(source.droppableId)
            ? { ...col, todos: sourceTodos }
            : col.id === parseInt(destination.droppableId)
            ? { ...col, todos: destinationTodos }
            : col
        )
      );

    } 
    // drop across same column
    else{
      // find dropped col id
      const column = columns.find((column) => column.id === parseInt(source.droppableId))
      const columnTodos = [...column.todos];
      const [movedTodo] = columnTodos.splice(source.index,1);
      todoColId = column.id;
      todoOrder = destination.index;
      todoId = movedTodo._id;
      columnTodos.splice(destination.index,0, movedTodo)
      column.todos = reorderTodos(columnTodos)
      impactedTodos = column.todos

      setColumns((prevColumns) =>
        prevColumns.map((col) =>
          col.id === parseInt(source.droppableId)
            ? { ...col, todos: columnTodos }
            : col
        )
      );

    }
    // setColumns(updatedColumns)
      
    // const updatedTodos = updatedColumns.flatMap((col) => col.todos);
    try{

      await Promise.all (
        impactedTodos.map((todo) =>
          updateTodo(todo._id , {
            order:todo.order,
            columnId:todo.columnId
          }
        )
      ))
      // await fetchAndAssignTodos()
    }catch(err){
      console.error("error updating the backend")
    }

  }

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
  async function getTodos() {
    try {
      // console.log(token);
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/todos`, {
        headers: {
          token: token,
        },
      });
      // console.log(response.data);
      return response.data;
    } catch (err) {
      return err;
    }
  }
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
    setLoading(false)
  }

  useEffect(() => {
    
    if (token) {
      fetchAndAssignTodos();
    }
  }, [token]);


  return(
    <div className="py-4 lg:py-8 px-2">
      {loading ? (
        <div className="flex items-center justify-center h-screen">
          <span className="text-gray-500 text-xl">Loading todos...</span>
        </div>
      ): (
        <DragDropContext
        onDragEnd={onDragEnd}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6 ">
            {columns.map((column) => (
              <Column key = {column.id} column= {column} setColumns = {setColumns}/>
            ))}
          </div>
      </DragDropContext>
      )}
    
    </div>
  )
}