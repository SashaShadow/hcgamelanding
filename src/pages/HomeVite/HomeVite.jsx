import axios from "axios";
import { useState } from 'react'
import headCutterLogo from '../../assets/LOGO.png'
import headCutterLogo3D from '../../assets/logo3d.png'
import fondoLogo from '../../assets/fondotexto4k.png'

import { RiInstagramFill } from "react-icons/ri";
import { FaTwitter } from "react-icons/fa6";
import { FaYoutube } from "react-icons/fa6";
import { FaTiktok } from "react-icons/fa6";
import './HomeVite.css'

const HomeVite = () => {

  const [email, setEmail] = useState("")
  const [error, setError] = useState(null)
  const [loader, setLoader] = useState(false)

  const submit = async () => {
    try {
      setLoader(true)
      if (validateEmail(email)) {
        const back_url = import.meta.env.VITE_BACKEND_URL
        const payload = { mail: email }

        const crearCorreo = await axios.post(`${back_url}mail/`, payload)
        console.log(crearCorreo.data)

        if (`${crearCorreo.data.status_code}`.startsWith(2)) {
          alert(`${email} successfully added to our mailing list`)
        } else {
          alert(`${crearCorreo.data.description}`)
        }
      } else {
        alert("check your email format. ex: test@devpetrichor.com.ar")
      }
    } catch (err) {
      console.log(err.toString())
    } finally {
      setLoader(false)
    }

  }

  const validateEmail = (email) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(String(email).toLowerCase());
  }

  return (
    <>
      <section id="center">
        <div className="LogoCont">
          <img src={headCutterLogo3D} className="logo"
            alt="Headcutter"
            style={{
              backgroundImage: `url(${fondoLogo})`,
              backgroundSize: 'cover', // Ajusta a 'cover' si prefieres que llene todo el espacio
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center'
            }}
          />
          <div className="links">
            <span className="linkspan">
              <p><span className="rosebud link"><a href="https://discord.gg/eGyrF3TgY8" target="_blank">JOIN</a></span> our discord</p>
              <p><span className="rosebud link">WISHLIST</span> our game</p>

            </span>
            <span className="linkspan">
              <p><span className="rosebud">contact us:</span> hello@devpetrichor.com.ar</p>

              <span className="email">
                <p><span className="rosebud">join</span> our newsletter:</p>
                <div className="emailinp">
                  <input type="email" onChange={(e) => setEmail(e.target.value)} className="form-control" placeholder="your email" />
                  <button onClick={() => submit()} disabled={email === "" || loader}>submit</button>
                </div>
              </span>

            </span>

          </div>

          <div className="socialMediaCont">
            <RiInstagramFill onClick={() => window.open("https://www.instagram.com/devpetrichor/", "_blank")} />
            <FaTwitter onClick={() => window.open("https://x.com/DevPetrichor", "_blank")} />
            <FaYoutube onClick={() => window.open("https://www.youtube.com/channel/UCg48jY_k6jbHLrDU15xPoVw", "_blank")} />
            <FaTiktok onClick={() => window.open("https://www.tiktok.com/@devpetrichor", "_blank")} />
            <svg
              viewBox="0 0 64 57"
              width="1em"
              height="1em"
              onClick={() => window.open("https://bsky.app/profile/devpetrichor.bsky.social", "_blank")}
            >
              <path fill="currentColor" d="M13.873 3.805C21.21 9.332 29.103 20.537 32 26.55v15.882c0-.338-.13.044-.41.867-1.512 4.456-7.418 21.847-20.923 7.944-7.111-7.32-3.819-14.64 9.125-16.85-7.405 1.264-15.73-.825-18.014-9.015C1.12 23.022 0 8.51 0 6.55 0-3.268 8.579-.182 13.873 3.805ZM50.127 3.805C42.79 9.332 34.897 20.537 32 26.55v15.882c0-.338.13.044.41.867 1.512 4.456 7.418 21.847 20.923 7.944 7.111-7.32 3.819-14.64-9.125-16.85 7.405 1.264 15.73-.825 18.014-9.015C62.88 23.022 64 8.51 64 6.55c0-9.818-8.578-6.732-13.873-2.745Z"></path>
            </svg>
          </div>

        </div>

      </section>
    </>
  )
}

export default HomeVite