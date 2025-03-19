import './App.css'
import Home from './components/Home'
import Navbar from './components/Navbar'
import MyFooter from './components/MyFooter'
import SmartParkingDescription from './components/SmartParkingDescription'
import Features from "./components/Features";
import ComponentsSP from "./components/ComponentsSP";
import About from './components/About'
import FQA from './components/FQA'
import Contact from './components/Contact'
function App() {

  return (
    <>
     <Navbar/>
     <Home/>
     <SmartParkingDescription/>
     <ComponentsSP/>
     <Features />
     <About/>
     <FQA/>
     <Contact/>
     <MyFooter/>
    </> 
  )
}

export default App


