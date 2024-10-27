import { useEffect } from "react";
import Todos from "../components/Todos";
import { useNavigate } from "react-router-dom";

export default function TodoPage(){
  const token = localStorage.getItem("token");
  const navigate = useNavigate()
  useEffect(()=>{
    if(!token){
      navigate("/signup")
    }
  },[])
  return(
    <div className="max-w-7xl mx-auto px-4">
      <Todos/>
    </div>
  )
}