import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Signup(){
  function Signupform(){

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [token,setToken] = useState("");
    const navigate = useNavigate();

    useEffect(()=> {
      if (token){
        console.log("token is ", token)
        localStorage.setItem("token", token)
        navigate("/todos")
      }
  
    },[token])


    const handleSignInSubmission = async (event) => {
      event.preventDefault();
      try{
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/signup`, {username, password});
        console.log(response.data.token);
        setToken(response.data.token)
        
      } catch(err){
        console.log("error while signing in", err)
      }
    }

    return (
        
          <div className=" dark:text-black flex min-h-full flex-1 flex-col justify-center px-6 pb-20  lg:px-8 ">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm mt-6">
              <p className="dark:text-gray-400 text-sm text-center">Already a user ? <a href="/signin" className="hover:text-gray-50">Sign in</a> </p>
              <h2 className="mt-6 text-center text-xl font-bold leading-9 tracking-tight dark:text-gray-200 text-black sm:text-2xl">
                Sign Up to continue
              </h2>
            </div>
  
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
              <form onSubmit={handleSignInSubmission} className="space-y-6">
                <div>
                  <label htmlFor="username" className=" dark:text-gray-200 block text-sm font-medium leading-6 ">
                    Username
                  </label>
                  <div className="mt-2">
                    <input
                      id="username"
                      name="username"
                      type="text"
                      required
                      className="dark:text-gray-200 dark:bg-inherit  px-2 block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </div>
                </div>
    
                <div>
                  <div className="flex items-center justify-between">
                    <label htmlFor="password" className="dark:text-gray-200 block text-sm font-medium leading-6 ">
                      Password
                    </label>
                    {/* <div className="text-sm">
                      <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                        Forgot password?
                      </a>
                    </div> */}
                  </div>
                  <div className="mt-2">
                    <input
                      id="password"
                      name="password"
                      type="text"
                      required
                      onChange={(e) => setPassword(e.target.value)}
                      className="dark:text-gray-200 dark:bg-inherit px-2 block w-full rounded-md border-0 py-1.5  shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
    
                <div>
                  <button
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Sign up
                  </button>
                </div>
              </form>
  
          
            </div>
          </div>
        
    )
  }


  return (
    <Signupform/>  )
}

