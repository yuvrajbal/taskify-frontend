import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Todos from './components/Todos'
function App() {
  return(
    <div className=''>
      <BrowserRouter>
        <Routes>
          <Route path="/todos" element={<Todos/>}/>

        </Routes>
      </BrowserRouter>
    </div>
  )
}
export default App
