import { useNavigate } from "react-router-dom"
import { useState, useEffect } from "react";
export default function Header(){
  const navigate = useNavigate();
  const token = localStorage.getItem("token")
  const [isSignedIn, setIsSignedIn] = useState(false);
  const[loading,setLoading] = useState(true);

  const [darkMode, setDarkMode] = useState(() => {
      const savedMode = localStorage.getItem("darkMode");
      return savedMode ? JSON.parse(savedMode) : true; // Default to dark mode if no saved preference
    });

    useEffect(() => {
      const metaTag = document.querySelector('meta[name="apple-mobile-web-app-status-bar-style"]');
      // Apply the dark mode class to the document when the component mounts
      if (darkMode) {
        document.documentElement.classList.remove("light");
        document.documentElement.classList.add("dark");
        
      } else {
        document.documentElement.classList.remove("dark");
        document.documentElement.classList.add("light");
       
      }
    }, [darkMode]);

    const handleModeChange = () =>{
      const newMode = !darkMode;
      setDarkMode(newMode);
      localStorage.setItem("darkMode", newMode);
      document.documentElement.classList.toggle("dark", newMode);
  
    }
  
    // useEffect(() => {
    //   const htmlElement = document.documentElement;
  
    //   // Apply mode without waiting for the render
    //   const applyMode = (mode) => {
    //     if (mode) {
    //       htmlElement.classList.add("dark");
    //       htmlElement.setAttribute("style", "color-scheme: dark;");
    //     } else {
    //       htmlElement.classList.remove("dark");
    //       htmlElement.setAttribute("style", "color-scheme: light;");
    //     }
    //   };
  
    //   // Apply the saved or default mode
    //   applyMode(darkMode);
      
    //   // Save the user's preference in localStorage
    //   localStorage.setItem("darkMode", JSON.stringify(darkMode));
    // }, [darkMode]);
  
  


  useEffect(() => {
    if(token){
      setIsSignedIn(true)
    }
    setLoading(false)
  },[token])

  const signOut = () => {
    localStorage.setItem("token", "")
    setIsSignedIn(false)
    navigate("/")
  }


  const handleLogin = () => {
    navigate("/signin")
  }


  // const handleModeChange = () => {
  //   setDarkMode((prevMode) => !prevMode);
  // };

  return (
    <div className="flex flex-row justify-between  px-1 md:px-6 max-w-7xl mx-auto py-4">
        <div className="flex items-center gap-3 pl-2">
            <a href={"/" }>
              {/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" className="size-8 stroke-black dark:stroke-white">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0 0 12 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75Z" />
              </svg> */}
              <img className="w-6 lg:w-9 h-auto" src="todo-list.svg" alt="todoicon" />

            </a>
            <div className="font-medium block text-black dark:text-gray-200 text-base lg:text-xl">
              <a href ={"/todos"}>Taskify</a>
            </div>
        </div>
        <div className="flex items-center gap-0 sm:gap-1 ">
          {/* color mode change */}
          <button 
            className=""
            onClick={handleModeChange}>
            {darkMode? <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="white" className=" size-5 lg:size-7">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
            </svg> : 
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="black" className="size-5 lg:size-7">
              <path stroke-linecap="round" stroke-linejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
            </svg>
            
              }
            
          </button>
          
          {/* signin/signout button */}
          {!loading && (
            <button 
            className="px-3 text-base lg:text-lg py-1  rounded-lg hover:bg-neutral-300 font-normal lg:font-medium dark:text-white dark:hover:bg-neutral-600"
            onClick={isSignedIn ? signOut : handleLogin}
            >
              
              <span>{isSignedIn ? "Sign out" : "Sign in"}</span>
              </button>
          
           
          )}
       
        </div>
    </div>
  )
}