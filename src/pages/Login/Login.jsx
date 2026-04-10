import { useState, useContext } from 'react'
import Context from '../../context/SessionContext.jsx';
import axios from 'axios';
import './Login.css';
import { useNavigate } from 'react-router-dom';

const Login = () => {

    const { setUser, setToken } = useContext(Context)
    const [errorAlert, setErrorAlert] = useState(null)
    const [loader, setLoader] = useState(false)
    const navigate = useNavigate();

    const onSubmit = async (e) => {
        e.preventDefault()
        setLoader(true)
        try {
            const username = e.target.elements.username.value;
            const password = e.target.elements.password.value;

            const credenciales = {
                username, password
            }

            const back_url = import.meta.env.VITE_BACKEND_URL

            const loginAccion = await axios.post(`${back_url}admin/login`, credenciales)

            if (loginAccion.data.error) throw new Error(loginAccion.data.error)

            setToken(loginAccion.data.access_token)
            setUser({ username: username })

            navigate('/ctrl');

        } catch (err) {
            setErrorAlert(err.toString())
        }
        setLoader(false)
    }

    return (
        <>
            <h1 className='GestorTitle rosebud'>Login</h1>
            {errorAlert &&
                <>
                    <h2 className='blanco'>{errorAlert}</h2>
                </>}

            {loader &&
                <>
                    <h3 className='Loading'>Loading...</h3>
                    <span class="loader"></span>
                </>
            }
            <div className='ContLogin'>
                <div className="back">
                    <div className="div-center">
                        <div className="content">
                            <form onSubmit={onSubmit}>
                                <div className="form-group divin">
                                    <label htmlFor="username">User</label>
                                    <input type="text" className="form-control" name='username' id="username" placeholder="usuario" />
                                </div>
                                <div className="form-group divin">
                                    <label htmlFor="password">Password</label>
                                    <input type="password" className="form-control" name='password' id="password" placeholder="password" />
                                </div>
                                <button type="submit" className="btn btn-primary">Login</button>
                                <hr />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login;