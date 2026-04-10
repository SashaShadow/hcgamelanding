import { useState, useEffect, useContext } from 'react'
import axios from 'axios';
import Context from '../../context/SessionContext.jsx';
import { useNavigate } from 'react-router-dom';
import './Admin.css';
import headCutterLogo from '../../assets/LOGO.png'

const Admin = () => {

    const [errorAlert, setErrorAlert] = useState(null)
    const [back_url, setBack_url] = useState(import.meta.env.VITE_BACKEND_URL)
    const [eleccion, setEleccion] = useState(null)
    const [newsletters, setNewsletters] = useState([])
    const [mails, setMails] = useState([])
    const [refrescar, setRefrescar] = useState(false)
    const [newsletter, setNewsletter] = useState({
        titulo: "",
        asunto: "",
        cuerpo: "",
        imagen_url: ""
    })
    const [sePuedeCrear, setSePuedeCrear] = useState(false)
    const [loader, setLoader] = useState(false)

    const { token, logout } = useContext(Context);
    const navigate = useNavigate();

    useEffect(() => {
        const apiCalls = async () => {
            try {
                const getNewsletters = await axios.get(`${back_url}newsletter/`, { headers: { Authorization: `Bearer ${token}` } })
                setNewsletters(getNewsletters.data.data)
                const getMails = await axios.get(`${back_url}mail/`, { headers: { Authorization: `Bearer ${token}` } })
                setMails(getMails.data.data)
                setErrorAlert(null)
            } catch (err) {
                setErrorAlert(err.toString())
            }
        }

        if (token) {
            apiCalls()
        }
    }, [token, refrescar])

    useEffect(() => {
        const fechaKeys = Object.keys(newsletter)

        const todosLlenos = fechaKeys.every(key => {
            if (key !== "imagen_url") {
                return newsletter[key]
            } else {
                return true
            }
        })

        setSePuedeCrear(todosLlenos)
    }, [newsletter])


    useEffect(() => {
        if (!token) {
            navigate("/login")
        }
    }, [token])

    const handleSend = async (id) => {
        setLoader(true)
        try {
            const sendNewsletter = await axios.post(`${back_url}newsletter/enviar/${id}`, {}, { headers: { Authorization: `Bearer ${token}` } })
            if (sendNewsletter.data.status_code !== 200) throw new Error("Error al enviar el newsletter")
            alert("Newsletter enviado correctamente")
            setErrorAlert(null)
        } catch (err) {
            console.log(err.toString())
            setErrorAlert(err.toString())
        } finally {
            setLoader(false)
        }
    }

    const handleDelete = async (id) => {
        try {
            const deleteNewsletter = await axios.delete(`${back_url}mail/inactive/${id}`, { headers: { Authorization: `Bearer ${token}` } })
            if (deleteNewsletter.data.status_code !== 200) throw new Error("Error al eliminar el email")
            alert("Email eliminado correctamente")
            setRefrescar(!refrescar)
            setErrorAlert(null)
        } catch (err) {
            console.log(err.toString())
            setErrorAlert(err.toString())
        }
    }

    const handleChange = (e) => {
        setNewsletter({ ...newsletter, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let headers = {
                Authorization: `Bearer ${token}`
            }

            const crearfecha = await axios.post(`${back_url}newsletter/`, newsletter, { headers: headers })
            if (crearfecha.data.status_code !== 200) throw new Error("Error al crear el newsletter")

            alert("Newsletter creado correctamente")
            setRefrescar(!refrescar)
            setErrorAlert(null)
            setNewsletter({
                titulo: "",
                asunto: "",
                cuerpo: ""
            })
        } catch (err) {
            setErrorAlert(err.toString())
        }
    };

    return (
        <>
            <div className="AdminHeader">
                <h1 className='blanco rosebud'>Admin panel</h1>
                <img src={headCutterLogo} onClick={() => navigate("/")} style={{ width: "150px", cursor: "pointer" }} alt="Headcutter" />
                <button className='btn btn-danger btn-sm' onClick={logout}>Cerrar sesión</button>
            </div>

            {errorAlert &&
                <>
                    <h2 className='blanco'>Error: {errorAlert}</h2>
                </>}

            <div className="ElecAdm">
                <button className={`btn ${eleccion === "cargar" ? "active" : ""}`} onClick={() => setEleccion("cargar")}>Cargar Newsletter</button>
                <button className={`btn ${eleccion === "enviar" ? "active" : ""}`} onClick={() => setEleccion("enviar")}>Accion sobre newsletters</button>
                <button className={`btn ${eleccion === "mails" ? "active" : ""}`} onClick={() => setEleccion("mails")}>Control de emails</button>
            </div>

            {eleccion === "cargar" && (
                <div className="ContNewsTable">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="titulo">Titulo del newsletter</label>
                            <input type="text" className="form-control" id="titulo" name="titulo" value={newsletter.titulo} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="asunto">Asunto del mail</label>
                            <input type="text" className="form-control" id="asunto" name="asunto" value={newsletter.asunto} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="cuerpo">Cuerpo del mail</label>
                            <textarea className="form-control" id="cuerpo" name="cuerpo" value={newsletter.cuerpo} onChange={handleChange}></textarea>
                        </div>

                        <button type="submit" className="btn btn-primary" disabled={!sePuedeCrear}>Crear</button>
                    </form>
                </div>
            )}

            {eleccion === "enviar" && (
                <div className='ContNewsTable'>
                    {newsletters.length > 0 ? (
                        <>
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th scope="col">Titulo</th>
                                        <th scope="col">Asunto</th>
                                        <th scope="col">Cuerpo del mail</th>
                                        <th scope="col">Accion</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {newsletters.map((newsletter) => (
                                        <tr key={newsletter._id}>
                                            <td>{newsletter.titulo}</td>
                                            <td>{newsletter.asunto}</td>
                                            <td style={{ whiteSpace: "pre-wrap" }}>{newsletter.cuerpo}</td>
                                            <td>
                                                <button className="btn btn-primary" disabled={loader} onClick={() => handleSend(newsletter._id)}>Enviar</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </>
                    ) : (
                        <h2 className='blanco'>No se encontraron newsletters para enviar</h2>
                    )}
                </div>
            )}

            {eleccion === "mails" && (
                <div className='ContNewsTable'>
                    {mails.length > 0 ? (
                        <>
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th scope="col">Email</th>
                                        <th scope="col">Accion</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {mails.map((mail) => (
                                        <tr key={mail._id}>
                                            <td>{mail.mail}</td>
                                            <td>
                                                <button className="btn btn-danger" onClick={() => handleDelete(mail._id)}>Eliminar</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </>
                    ) : (
                        <h2 className='blanco'>No se encontraron emails</h2>
                    )}
                </div>
            )}
        </>
    )
}

export default Admin;