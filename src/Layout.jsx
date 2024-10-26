import { Outlet } from "react-router-dom";
import Header from "./components/Header";
export default function Layout(){
  return (
    <div className="mx-auto dark:bg-black ">
      <Header />
      <div className="  min-h-screen">
        <Outlet/>
      </div>

    </div>
  )
}