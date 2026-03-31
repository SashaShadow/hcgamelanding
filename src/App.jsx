import { useState } from 'react'
import headCutterLogo from './assets/LOGO.png'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";


const HomeVite = () => {

  const [email, setEmail] = useState("")

  const submit = () => {
    if (validateEmail(email)) {
      alert(`${email} successfully added to our mailing list`)
    } else {
      alert("check your email format. ex: test@devpetrichor.com.ar")
    }
  }

  const validateEmail = (email)  =>{
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(String(email).toLowerCase());
  }

 return (
    <>
      <section id="center">
        <div className="LogoCont">
          <img src={headCutterLogo} className="logo" 
          // width="1500" height="179" 
          alt="Headcutter" 
          />
          <div className="links">
            <span className="linkspan">
              <p><span className="rosebud link"><a href="https://discord.gg/hzEAG4Nb" target="_blank">JOIN</a></span> our discord</p>
              <p><span className="rosebud link">WISHLIST</span> our game</p>

            </span>
            <span className="linkspan">
              <p><span className="rosebud link">CONTACT US:</span> ej@devpetrichor.com.ar</p>

              <span className="email">
                <p><span className="rosebud link">JOIN</span> our mailing list:</p>
                <div className="emailinp">
                  <input type="email" onChange={(e) => setEmail(e.target.value)} className="form-control" placeholder="your email"/>
                  <button onClick={() => submit()}  disabled={email === ""}>submit</button>
                </div>
              </span>

            </span>
          
          </div>

        </div>
        
      </section>
    </>
  )
}

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeVite />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App
