import { useState } from 'react'
import './App.css'
import Products from './components/product/Products'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './components/home/Home';

function App() {
  const [count,setCount] = useState();

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/products' element={<Products/>}/>
      </Routes>
    </Router>
  )
}

export default App
