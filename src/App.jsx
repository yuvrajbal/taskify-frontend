import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Todos from './components/Todos';
import Signin from './components/SignIn';
import Layout from './Layout';
import Hero from './pages/Hero';
import TodoPage from './pages/TodosPage';
function App() {
  return(
    <div className=' '>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout/>}>
            <Route path="" element= {<Hero/>}/>
            <Route path="todos" element={<TodoPage/>}/>
            <Route path="signin" element={<Signin/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}
export default App
