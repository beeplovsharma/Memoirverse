import { useState } from 'react'
import './App.css'
import Profile from './components/Profile'
import LocomotiveScroll from "locomotive-scroll";



function App() {
  const locomotiveScroll = new LocomotiveScroll();
  const [count, setCount] = useState(0)

  return (
    <>
      <Profile />
    </>
  );
}

export default App
