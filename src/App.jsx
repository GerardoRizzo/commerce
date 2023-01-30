import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { HashRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import ProductDetail from './pages/ProductDetail'
import Login from './pages/Login'
import Purchases from './pages/Purchases'
import AppNavbar from './components/AppNavbar'
import LoadingScreen from './components/LoadingScreen'
import { useSelector } from 'react-redux'

function App() {
  const [count, setCount] = useState(0)

  const isLoading = useSelector(state => state.isLoading);

  return (
    <div className="App">
      <HashRouter>
        <AppNavbar />
        {isLoading && <LoadingScreen />}
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/product/:id' element={<ProductDetail />} />
          <Route path='/login' element={<Login />} />
          <Route path='/purchases' element={<Purchases />} />
        </Routes>
      </HashRouter>
    </div>
  )
}

export default App
