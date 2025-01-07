import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

import './App.css'
import Header from './components/Header';
import Slider from './components/Slider';
import Course from './components/Course';

function App() {
  const [count, setCount] = useState(0)


  return (
    <>
      <Header />
      <Slider />
      <Course />

   

    </>
  )
}

export default App
